"use client";
import * as React from "react";
import { PauseIcon, PlayIcon, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";

export type FlowStage = {
  num: string;
  title: string;
  payload: string;
  icon: LucideIcon;
  desc: string;
};

const TICK_MS = 1800;
const LOG_LINES = 6;
const layouts = {
  3: {
    grid: "md:grid-cols-3",
    track: "md:block",
    cards: "md:mt-0",
  },
  4: {
    grid: "sm:grid-cols-2 lg:grid-cols-4",
    track: "lg:block",
    cards: "lg:mt-0",
  },
  5: {
    grid: "sm:grid-cols-2 lg:grid-cols-5",
    track: "lg:block",
    cards: "lg:mt-0",
  },
} as const;

export function FlowSimulation({
  stages,
  logLine,
  header,
}: {
  stages: FlowStage[];
  logLine: (tick: number) => string;
  header: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [tick, setTick] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  React.useEffect(() => {
    if (!playing || !inView) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [playing, inView]);
  const logRef = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [tick]);
  const n = stages.length;
  const layout = layouts[n as 3 | 4 | 5];
  const slot = 100 / n;
  const stage = tick % n;
  const logStart = Math.max(0, tick - LOG_LINES + 1);
  const log = Array.from(
    { length: tick - logStart + 1 },
    (_, i) => logStart + i,
  );
  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        {header}
        <Button variant="outline" onClick={() => setPlaying((p) => !p)}>
          {playing ? (
            <PauseIcon data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          {playing ? "PAUSE_SIMULATION" : "RUN_SIMULATION"}
        </Button>
      </div>
      <div aria-hidden className={`relative mt-10 hidden h-8 ${layout.track}`}>
        <svg className="absolute inset-0 size-full overflow-visible">
          {stages.map((s, i) => {
            const x = (i + 0.5) * slot;
            const reached = i <= stage;
            return (
              <g key={s.num}>
                {i < n - 1 && (
                  <line
                    x1={`${x}%`}
                    x2={`${x + slot}%`}
                    y1={12}
                    y2={12}
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    className={
                      i === stage - 1
                        ? "animate-dash-flow stroke-primary motion-reduce:animate-none"
                        : i < stage - 1
                          ? "stroke-primary"
                          : "stroke-muted-foreground/40"
                    }
                  />
                )}
                <line
                  x1={`${x}%`}
                  x2={`${x}%`}
                  y1={12}
                  y2={32}
                  strokeWidth={2}
                  className={
                    reached ? "stroke-primary" : "stroke-muted-foreground/40"
                  }
                />
                <circle
                  cx={`${x}%`}
                  cy={12}
                  r={4}
                  className={
                    reached ? "fill-primary" : "fill-muted-foreground/40"
                  }
                />
              </g>
            );
          })}
        </svg>
        <Badge
          className={`absolute top-3 -translate-x-1/2 -translate-y-1/2 motion-reduce:transition-none ${
            stage === 0 ? "" : "transition-[left] duration-700"
          }`}
          style={{ left: `${(stage + 0.5) * slot}%` }}
        >
          {stages[stage].payload}
        </Badge>
      </div>
      <div className={`mt-10 grid gap-4 ${layout.grid} ${layout.cards}`}>
        {stages.map((s, i) => (
          <Card
            key={s.num}
            className={
              i === stage
                ? "border-primary transition-colors"
                : "transition-colors"
            }
          >
            <CardHeader>
              <span className="text-2xl font-extrabold text-primary">
                {s.num}
              </span>
              <CardAction>
                <s.icon
                  className={
                    i === stage ? "text-primary" : "text-muted-foreground"
                  }
                />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardTitle>{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>LIVE</CardTitle>
          <CardAction>
            <Badge variant={playing ? "default" : "outline"}>
              {playing ? "RUNNING" : "PAUSED"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul
            ref={logRef}
            tabIndex={0}
            aria-label="Simulation log"
            className="flex h-36 flex-col gap-1 overflow-y-auto text-muted-foreground"
          >
            {log.map((t) => (
              <li
                key={t}
                className={t === tick ? "text-foreground" : undefined}
              >
                <span className="text-secondary">
                  T+{String(t).padStart(3, "0")}
                </span>{" "}
                {logLine(t)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
