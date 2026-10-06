"use client";
import * as React from "react";
import { SamtekLogo } from "@/components/samtek-logo";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEP_MS = 600;
const HOLD_STEPS = 3;

type SourceProps = {
  lit: boolean;
  active: boolean;
  children: React.ReactNode;
};

function Source({ lit, active, children }: SourceProps) {
  return (
    <Card
      size="sm"
      className={`transition-colors ${
        active ? "border-primary" : lit ? "border-secondary" : ""
      }`}
    >
      {children}
    </Card>
  );
}

const GAP = 16;
const PATH_H = 80;
const LANE = 24;

function Routes({
  lit,
  width,
  from,
}: {
  lit: boolean[];
  width: number;
  from: "top" | "bottom";
}) {
  const n = lit.length;
  const cell = (width - GAP * (n - 1)) / n;
  const ys = from === "top" ? 0 : PATH_H;
  const ye = PATH_H - ys;
  const bend = (i: number) => {
    const depth = 24 + (Math.abs(i - (n - 1) / 2) - 0.5) * 16;
    return from === "top" ? depth : PATH_H - depth;
  };
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${PATH_H}`}
      className="hidden h-20 w-full lg:block"
    >
      {lit.map((on, i) => {
        const x0 = i * (cell + GAP) + cell / 2;
        const x1 = width / 2 + (i - (n - 1) / 2) * LANE;
        return (
          <path
            key={i}
            d={`M ${x0} ${ys} L ${x0} ${bend(i)} L ${x1} ${bend(i)} L ${x1} ${ye}`}
            fill="none"
            strokeWidth={2}
            strokeDasharray="6 6"
            className={`transition-colors ${
              on
                ? "animate-dash-flow stroke-primary motion-reduce:animate-none"
                : "stroke-muted-foreground/40"
            }`}
          />
        );
      })}
    </svg>
  );
}

export function CompatibilityFlow({
  protocols,
  brands,
}: {
  protocols: string[];
  brands: string[];
}) {
  const [ref, inView, seen] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [tick, setTick] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  const total = protocols.length + brands.length;
  const cycle = total + HOLD_STEPS;
  React.useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduced]);
  const step = tick % cycle;
  const connected = reduced ? total : !seen ? 0 : Math.min(step + 1, total);
  const active = reduced || !seen || step >= total ? -1 : step;
  const allConnected = connected === total;
  let status = "WAITING FOR SOURCES…";
  if (allConnected) {
    status = "ALL SOURCES CONNECTED · NO HARDWARE SWAP";
  } else if (active >= 0 && active < protocols.length) {
    status = `PROTOCOL ${protocols[active]} · NEGOTIATED`;
  } else if (active >= protocols.length) {
    status = `DEVICE ${brands[active - protocols.length]} · STREAM CONNECTED`;
  }
  return (
    <div ref={ref} className="mt-10 flex flex-col">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {protocols.map((protocol, i) => (
          <Source key={protocol} lit={i < connected} active={i === active}>
            <CardContent className="flex gap-2">
              <span className="text-primary">‣</span>
              {protocol}
            </CardContent>
          </Source>
        ))}
      </div>
      {width > 0 && (
        <Routes
          from="top"
          width={width}
          lit={protocols.map((_, i) => i < connected)}
        />
      )}
      <Card className="mx-auto mt-4 w-full max-w-md lg:mt-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SamtekLogo />
            EDGE CORE
          </CardTitle>
          <CardAction>
            <Badge variant={allConnected ? "default" : "outline"}>
              {connected}/{total} SOURCES
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="text-muted-foreground">{status}</CardContent>
      </Card>
      {width > 0 && (
        <Routes
          from="bottom"
          width={width}
          lit={brands.map((_, j) => protocols.length + j < connected)}
        />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-0">
        {brands.map((brand, j) => {
          const i = protocols.length + j;
          return (
            <Source key={brand} lit={i < connected} active={i === active}>
              <CardContent className="text-center font-bold text-muted-foreground">
                {brand}
              </CardContent>
            </Source>
          );
        })}
      </div>
    </div>
  );
}
