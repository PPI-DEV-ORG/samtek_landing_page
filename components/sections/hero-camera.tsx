"use client";
import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "@/hooks/use-in-view";
import { useEasedProgress } from "@/hooks/use-eased-progress";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { scenarios, type Detection, type Scenario } from "@/lib/hero-scenarios";

type Phase = "scan" | "lock" | "detect" | "fields" | "hold";
type Frame = { phase: Phase; det: number; fields: number };

const TICK_MS = 500;
const SCAN_TICKS = 2;
const ASPECT = { w: 16, h: 10 };

function buildTimeline(scenario: Scenario): Frame[] {
  const frames: Frame[] = Array.from({ length: SCAN_TICKS }, () => ({
    phase: "scan" as const,
    det: -1,
    fields: 0,
  }));
  scenario.detections.forEach((d, det) => {
    frames.push({ phase: "lock", det, fields: 0 });
    frames.push({ phase: "detect", det, fields: 0 });
    d.fields.forEach((_, i) =>
      frames.push({ phase: "fields", det, fields: i + 1 }),
    );
    frames.push({ phase: "hold", det, fields: d.fields.length });
    frames.push({ phase: "hold", det, fields: d.fields.length });
  });
  return frames;
}

const defaultTimelines = scenarios.map(buildTimeline);

function locate(tick: number, timelines: Frame[][], only?: number) {
  const order = only === undefined ? timelines.map((_, i) => i) : [only];
  let t = tick % order.reduce((sum, s) => sum + timelines[s].length, 0);
  for (const s of order) {
    if (t < timelines[s].length) return { s, frame: timelines[s][t] };
    t -= timelines[s].length;
  }
  return { s: order[0], frame: timelines[order[0]][0] };
}

function CountUp({ to }: { to: number }) {
  const progress = useEasedProgress({ duration: 600, active: true });
  return <>{(to * progress).toFixed(1)}%</>;
}

function Thumb({
  scenario,
  det,
  loading,
}: {
  scenario: Scenario;
  det: Detection;
  loading?: boolean;
}) {
  const { x, y, w, h } = det.bbox;
  if (loading) {
    return (
      <Skeleton
        className={`shrink-0 self-start ${scenario.image ? "w-10" : "size-10"}`}
        style={
          scenario.image
            ? { aspectRatio: `${w * ASPECT.w} / ${h * ASPECT.h}` }
            : undefined
        }
      />
    );
  }
  if (!scenario.image) {
    return (
      <div className="flex size-10 shrink-0 self-start items-center justify-center bg-muted ring-1 ring-border">
        <scenario.icon className="size-5 text-muted-foreground" />
      </div>
    );
  }
  return (
    <div
      className="w-10 shrink-0 self-start bg-no-repeat ring-1 ring-border"
      style={{
        aspectRatio: `${w * ASPECT.w} / ${h * ASPECT.h}`,
        backgroundImage: `url("${scenario.image}")`,
        backgroundSize: `${100 / w}% ${100 / h}%`,
        backgroundPosition: `${w < 1 ? (x / (1 - w)) * 100 : 0}% ${h < 1 ? (y / (1 - h)) * 100 : 0}%`,
      }}
    />
  );
}

const inlineSkeleton = "inline-block h-[1em] align-middle";

// `reserve` keeps the card's final height while it fills in, using skeletons
// for whatever hasn't arrived yet; `loading` is the all-skeleton state.
function Result({
  scenario,
  det,
  shown,
  loading,
  reserve,
  className,
  style,
}: {
  scenario: Scenario;
  det: Detection;
  shown: number;
  loading?: boolean;
  reserve?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const complete = !loading && shown >= det.fields.length;
  const visible = loading ? 0 : shown;
  return (
    <Card
      size="sm"
      className={className}
      style={style}
      aria-busy={loading || undefined}
    >
      <CardHeader>
        <CardTitle>
          {loading ? (
            <Skeleton className={`${inlineSkeleton} w-28`} />
          ) : (
            det.label
          )}
        </CardTitle>
        <CardAction>
          {loading ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            <Badge variant="outline">
              <CountUp to={det.confidence} />
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-start gap-3">
        <Thumb scenario={scenario} det={det} loading={loading} />
        <dl className="flex min-w-0 flex-1 flex-col gap-1">
          {det.fields.slice(0, visible).map(([label, value]) => (
            <div
              key={label}
              className="flex animate-in justify-between gap-2 duration-300 fade-in motion-reduce:animate-none"
            >
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="truncate text-right">{value}</dd>
            </div>
          ))}
          {(loading || reserve) &&
            det.fields.slice(visible).map(([label]) => (
              <div key={label} className="flex justify-between gap-2">
                <dt>
                  <Skeleton className={`${inlineSkeleton} w-16`} />
                </dt>
                <dd>
                  <Skeleton className={`${inlineSkeleton} w-20`} />
                </dd>
              </div>
            ))}
        </dl>
      </CardContent>
      <CardFooter>
        {loading ? (
          <Skeleton className="h-4 w-16" />
        ) : (
          <Badge
            variant={det.tone === "alert" ? "default" : "secondary"}
            className={complete ? "" : "invisible"}
          >
            {det.status}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}

export function HeroCamera({
  only,
  list,
}: {
  only?: number;
  list?: Scenario[];
}) {
  const items = list ?? scenarios;
  const timelines = React.useMemo(
    () => (list ? list.map(buildTimeline) : defaultTimelines),
    [list],
  );
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [inView, reduced]);
  const { s, frame } = reduced
    ? {
        s: only ?? 0,
        frame: timelines[only ?? 0][timelines[only ?? 0].length - 1],
      }
    : locate(tick, timelines, only);
  const scenario = items[s];
  const current = frame.det >= 0 ? scenario.detections[frame.det] : null;
  const detected = frame.phase !== "scan" && frame.phase !== "lock";
  const showCard = current !== null && detected;
  let cardStyle: React.CSSProperties = {};
  let linkStyle: React.CSSProperties = {};
  let slide = "slide-in-from-left-2";
  if (current) {
    const { x, y, w, h } = current.bbox;
    const side = current.side ?? (x + w / 2 < 0.5 ? "right" : "left");
    const top = y + h / 2 < 0.5;
    const edge = side === "right" ? (x + w) * 100 : (1 - x) * 100;
    const inset = top ? y * 100 : (1 - y - h) * 100;
    cardStyle = {
      [side === "right" ? "left" : "right"]: `calc(${edge}% + 1rem)`,
      [top ? "top" : "bottom"]: `${inset}%`,
    } as React.CSSProperties;
    linkStyle = {
      [side === "right" ? "left" : "right"]: `${edge}%`,
      [top ? "top" : "bottom"]: `calc(${inset}% + 1.25rem)`,
    } as React.CSSProperties;
    slide = side === "right" ? "slide-in-from-left-2" : "slide-in-from-right-2";
  }
  const first = scenario.detections[0].bbox;
  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle>{scenario.camera}</CardTitle>
        <CardAction>
          <Badge className="animate-pulse">LIVE</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div
          ref={ref}
          className="relative aspect-16/10 w-full overflow-hidden bg-muted"
        >
          {items.map((sc, i) =>
            sc.image ? (
              <Image
                key={sc.image}
                src={sc.image}
                alt={`${sc.camera} camera view`}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${
                  i === s ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : null,
          )}
          {!scenario.image && (
            <scenario.icon
              key={scenario.camera}
              className="absolute size-16 -translate-x-1/2 -translate-y-1/2 animate-in text-muted-foreground duration-500 fade-in"
              style={{
                left: `${(first.x + first.w / 2) * 100}%`,
                top: `${(first.y + first.h / 2) * 100}%`,
              }}
            />
          )}
          {frame.phase === "scan" && (
            <div
              key={s}
              className="absolute inset-x-0 top-0 h-0.5 animate-scan-sweep bg-primary shadow-[0_0_12px_3px_var(--primary)] motion-reduce:hidden"
              style={{ animationDuration: `${SCAN_TICKS * TICK_MS}ms` }}
            >
              <div className="absolute inset-x-0 bottom-full h-16 bg-linear-to-t from-primary/40 to-transparent" />
            </div>
          )}
          {scenario.detections.map((d, j) => {
            const state =
              frame.det < 0 || j > frame.det
                ? "hidden"
                : j < frame.det
                  ? "done"
                  : frame.phase === "lock"
                    ? "lock"
                    : "solid";
            const alert = d.tone === "alert";
            return (
              <div
                key={j}
                className={`absolute border-2 transition-all duration-500 motion-reduce:transition-none ${
                  state === "hidden"
                    ? "scale-110 border-transparent opacity-0"
                    : state === "lock"
                      ? "border-dashed border-muted-foreground bg-muted-foreground/10"
                      : `${alert ? "border-primary bg-primary/20" : "border-secondary bg-secondary/20"} ${state === "done" ? "opacity-60" : ""}`
                }`}
                style={{
                  left: `${d.bbox.x * 100}%`,
                  top: `${d.bbox.y * 100}%`,
                  width: `${d.bbox.w * 100}%`,
                  height: `${d.bbox.h * 100}%`,
                }}
              >
                {(state === "solid" || state === "done") && (
                  <Badge
                    variant={alert ? "default" : "secondary"}
                    className={`absolute left-0 ${d.bbox.y > 0.07 ? "bottom-full" : "top-0"}`}
                  >
                    {d.label}
                  </Badge>
                )}
                {state === "lock" && (
                  <Badge
                    variant="outline"
                    className={`absolute left-0 bg-background ${d.bbox.y > 0.07 ? "bottom-full" : "top-0"}`}
                  >
                    ANALYZING…
                  </Badge>
                )}
              </div>
            );
          })}
          {showCard && (
            <>
              <div
                aria-hidden
                className="absolute hidden w-4 border-t border-dashed border-primary sm:block"
                style={linkStyle}
              />
              <Result
                key={`${s}-${frame.det}`}
                scenario={scenario}
                det={current}
                shown={frame.fields}
                style={cardStyle}
                className={`absolute hidden w-48 animate-in duration-300 fade-in sm:flex ${slide} motion-reduce:animate-none`}
              />
            </>
          )}
        </div>
        <Result
          key={`static-${s}-${frame.det}`}
          scenario={scenario}
          det={showCard ? current : (current ?? scenario.detections[0])}
          shown={showCard ? frame.fields : 0}
          loading={!showCard}
          reserve
          className="sm:hidden"
        />
      </CardContent>
      <CardFooter className="justify-between">
        <CardDescription>EDGE-NODE-01 · ON-PREM</CardDescription>
        <CardDescription>
          INFERENCE {detected ? `${scenario.latencyMs}ms` : "…"}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
