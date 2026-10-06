"use client";
import * as React from "react";
import {
  CameraIcon,
  CloudIcon,
  CpuIcon,
  GlobeIcon,
  MonitorIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LOOP_MS = 10000;

type Lane = {
  title: string;
  packet: string;
  note: string;
  nodes: { icon: LucideIcon; label: string }[];
  durationMs: number;
  cycleMs: number;
  finalMs: number;
  tone: "secondary" | "destructive";
  path?: [progress: number, position: number][];
  alertAt: number;
  status: (x: number, done: boolean) => string;
  uplink: { idle: string; busy: string };
  location: { idle: string; reached: string };
  storedAt: number;
};

const lanes: Lane[] = [
  {
    title: "SAMTEK (ON-PREM)",
    packet: "FRAME",
    note: "Frames are processed on the edge box. Nothing leaves your local network.",
    nodes: [
      { icon: CameraIcon, label: "CAMERA" },
      { icon: CpuIcon, label: "EDGE BOX" },
      { icon: MonitorIcon, label: "DASHBOARD" },
    ],
    durationMs: 2000,
    cycleMs: 2500,
    finalMs: 12,
    tone: "secondary",
    alertAt: 0.5,
    status: (x, done) =>
      done
        ? "ALERT DELIVERED"
        : x < 0.5
          ? "FRAME → EDGE BOX"
          : "INFERENCE DONE → DASHBOARD",
    uplink: { idle: "~0 (alerts only)", busy: "~0 (alerts only)" },
    location: { idle: "LOCAL NETWORK", reached: "LOCAL NETWORK" },
    storedAt: 0.5,
  },
  {
    title: "TYPICAL CLOUD VMS",
    packet: "VIDEO",
    note: "Every frame is uploaded, processed remotely, and sent back over the internet.",
    nodes: [
      { icon: CameraIcon, label: "CAMERA" },
      { icon: GlobeIcon, label: "INTERNET" },
      { icon: CloudIcon, label: "CLOUD" },
      { icon: MonitorIcon, label: "DASHBOARD" },
    ],
    durationMs: 6000,
    cycleMs: LOOP_MS,
    finalMs: 480,
    tone: "destructive",
    path: [
      [0, 0],
      [0.2, 0.33],
      [0.6, 0.4],
      [0.7, 0.67],
      [0.9, 0.72],
      [1, 1],
    ],
    alertAt: 0.67,
    status: (x, done) =>
      done
        ? "ALERT DELIVERED (LATE)"
        : x < 0.33
          ? "UPLOADING VIDEO…"
          : x < 0.67
            ? "QUEUED · WAITING ON NETWORK…"
            : "REMOTE INFERENCE → RETURNING…",
    uplink: { idle: "—", busy: "~8 Mbps / camera" },
    location: { idle: "—", reached: "THIRD-PARTY SERVER" },
    storedAt: 0.67,
  },
];

function along(points: [number, number][], p: number) {
  for (let i = 1; i < points.length; i++) {
    const [p1, x1] = points[i];
    if (p <= p1) {
      const [p0, x0] = points[i - 1];
      return x0 + ((p - p0) / (p1 - p0)) * (x1 - x0);
    }
  }
  return points[points.length - 1][1];
}

function useLoopClock(active: boolean) {
  const [t, setT] = React.useState(0);
  const elapsed = React.useRef(0);
  React.useEffect(() => {
    if (!active) return;
    const offset = elapsed.current;
    const begin = performance.now();
    let raf = requestAnimationFrame(function frame(now) {
      elapsed.current = Math.max(0, offset + now - begin) % LOOP_MS;
      setT(elapsed.current);
      raf = requestAnimationFrame(frame);
    });
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return t;
}

function Stat({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 border p-2 ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold break-words sm:truncate">{children}</span>
    </div>
  );
}

function LaneCard({ lane, t }: { lane: Lane; t: number }) {
  const cycle = Math.floor(t / lane.cycleMs);
  const local = t % lane.cycleMs;
  const p = Math.min(local / lane.durationMs, 1);
  const done = p >= 1;
  const x = lane.path ? along(lane.path, p) : p;
  const last = lane.nodes.length - 1;
  const delivered = cycle + (done ? 1 : 0);
  const busy = p > 0;
  const uplink = lane.path ? Math.min(1, x / 0.33) : 0.04;
  const stored = x >= lane.storedAt;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lane.title}</CardTitle>
        <CardAction>
          <Badge variant={done ? lane.tone : "outline"}>
            LATENCY {Math.round(p * lane.finalMs)}ms
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div aria-hidden className="relative mx-10 h-28">
          <svg className="absolute inset-x-0 top-14 h-0.5 w-full overflow-visible">
            <line
              x1="0%"
              x2="100%"
              y1={1}
              y2={1}
              strokeWidth={2}
              strokeDasharray="6 6"
              className="stroke-muted-foreground/40"
            />
            <line
              x1="0%"
              x2={`${x * 100}%`}
              y1={1}
              y2={1}
              strokeWidth={3}
              strokeDasharray="6 6"
              className={`stroke-primary ${
                done ? "" : "animate-dash-flow motion-reduce:animate-none"
              }`}
            />
          </svg>
          {lane.nodes.map((node, i) => {
            const reached = x >= i / last - 0.001;
            return (
              <div
                key={node.label}
                className="absolute top-8 flex -translate-x-1/2 flex-col items-center gap-1"
                style={{ left: `${(i / last) * 100}%` }}
              >
                <div
                  className={`relative flex size-12 items-center justify-center border bg-background transition-[color,border-color,box-shadow] ${
                    reached
                      ? "border-primary text-primary shadow-[0_0_14px_-2px_var(--primary)]"
                      : "text-muted-foreground"
                  }`}
                >
                  {reached && i > 0 && (
                    <span
                      key={cycle}
                      className="pointer-events-none absolute inset-0 animate-ring-out border-2 border-primary motion-reduce:hidden"
                    />
                  )}
                  <node.icon className="size-5" />
                </div>
                <span className="text-muted-foreground">{node.label}</span>
              </div>
            );
          })}
          <Badge
            variant={done ? lane.tone : "default"}
            className={`absolute top-0 right-0 translate-x-1/2 transition-opacity duration-300 ${
              done ? "opacity-100" : "opacity-0"
            }`}
          >
            ALERT
          </Badge>
          <Badge
            className={`absolute top-14 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              done || !busy ? "opacity-0" : ""
            }`}
            style={{ left: `${x * 100}%` }}
          >
            {x >= lane.alertAt ? "ALERT" : lane.packet}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className={`size-2 ${done ? "bg-secondary" : "animate-pulse bg-primary"}`}
          />
          {lane.status(x, done)}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="ALERTS">
            <span className={delivered > 0 ? "text-primary" : ""}>
              {delivered}
            </span>
          </Stat>
          <Stat label="UPLINK">
            <span className="mb-1 block h-1 bg-muted-foreground/20" aria-hidden>
              <span
                className={`block h-full transition-[width] ${lane.path ? "bg-destructive" : "bg-secondary"}`}
                style={{ width: `${uplink * 100}%` }}
              />
            </span>
            {busy ? lane.uplink.busy : lane.uplink.idle}
          </Stat>
          <Stat label="DATA" className="col-span-2 sm:col-span-1">
            <span className={stored && lane.path ? "text-destructive" : ""}>
              {stored ? lane.location.reached : lane.location.idle}
            </span>
          </Stat>
        </div>
        <CardDescription>{lane.note}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function CompareFlow() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const clock = useLoopClock(inView && !reduced);
  const t = reduced ? LOOP_MS - 1 : clock;
  return (
    <div ref={ref} className="mt-10 grid gap-4 md:grid-cols-2">
      {lanes.map((lane) => (
        <LaneCard key={lane.title} lane={lane} t={t} />
      ))}
    </div>
  );
}
