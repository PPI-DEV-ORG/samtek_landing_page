"use client";
import * as React from "react";
import {
  CameraIcon,
  CloudIcon,
  FileTextIcon,
  HardDriveIcon,
  KeyRoundIcon,
  LockIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Point = [x: number, y: number];
type NodeId =
  | "camera"
  | "edge"
  | "firewall"
  | "cloud"
  | "operator"
  | "auth"
  | "storage"
  | "log";
type Hop = [node: NodeId, packet: string];
type Frame = { step: number; hop: number; idle: boolean };

const pos: Record<NodeId, Point> = {
  operator: [10, 20],
  auth: [38, 20],
  log: [66, 20],
  camera: [10, 50],
  edge: [38, 50],
  firewall: [72, 50],
  cloud: [93, 50],
  storage: [38, 80],
};
const nodes: { id: NodeId; icon: LucideIcon; label: string }[] = [
  { id: "camera", icon: CameraIcon, label: "CAMERA" },
  { id: "edge", icon: ServerIcon, label: "EDGE SERVER" },
  { id: "firewall", icon: ShieldIcon, label: "FIREWALL" },
  { id: "cloud", icon: CloudIcon, label: "CLOUD" },
  { id: "operator", icon: UserIcon, label: "OPERATOR" },
  { id: "auth", icon: KeyRoundIcon, label: "RBAC" },
  { id: "storage", icon: HardDriveIcon, label: "LOCAL DISK" },
  { id: "log", icon: FileTextIcon, label: "AUDIT LOG" },
];
const links: [NodeId, NodeId][] = [
  ["camera", "edge"],
  ["edge", "firewall"],
  ["firewall", "cloud"],
  ["operator", "auth"],
  ["auth", "edge"],
  ["edge", "storage"],
  ["auth", "log"],
];
const steps: { route: Hop[]; hold: number }[] = [
  {
    route: [
      ["camera", "FRAME"],
      ["edge", "INFERENCE"],
      ["storage", "CLIP"],
    ],
    hold: 1,
  },
  {
    route: [
      ["edge", "UPLOAD"],
      ["firewall", "UPLOAD"],
      ["edge", "DROPPED"],
    ],
    hold: 1,
  },
  {
    route: [
      ["operator", "TOKEN"],
      ["auth", "TOKEN"],
      ["edge", "ADMIN"],
    ],
    hold: 1,
  },
  {
    route: [
      ["edge", "EVENT"],
      ["auth", "EVENT"],
      ["log", "EVENT"],
    ],
    hold: 1,
  },
  { route: [["edge", ""]], hold: 2 },
];
const timeline: Frame[] = steps.flatMap(({ route, hold }, step) => [
  ...route.map((_, hop) => ({ step, hop, idle: false })),
  ...Array.from({ length: hold }, () => ({
    step,
    hop: route.length - 1,
    idle: true,
  })),
]);
const stepRange = steps.map((_, s) => {
  const first = timeline.findIndex((f) => f.step === s);
  const len = timeline.filter((f) => f.step === s).length;
  return { first, len };
});
const encryptedLinks: [NodeId, NodeId][] = [
  ["camera", "edge"],
  ["edge", "firewall"],
  ["operator", "auth"],
  ["auth", "edge"],
  ["edge", "storage"],
  ["auth", "log"],
];
const TICK_MS = 800;
const midpoint = (a: NodeId, b: NodeId): Point => [
  (pos[a][0] + pos[b][0]) / 2,
  (pos[a][1] + pos[b][1]) / 2,
];

export function SecurityFlow({ points }: { points: string[] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [inView, reduced]);
  const index = reduced ? timeline.length - 1 : tick % timeline.length;
  const { step, hop, idle } = timeline[index];
  const { route } = steps[step];
  const [atNode, packet] = route[hop];
  const moving = hop > 0 && !idle;
  const past = (s: number, h: number) => step > s || (step === s && hop >= h);
  const stored = past(0, 2);
  const blocked = past(1, 1);
  const authorised = past(2, 1);
  const logged = past(3, 2);
  const encrypted = step === 4;
  const denied = step === 1 && hop >= 1;
  const visited = route.slice(0, hop + 1).map(([n]) => n);
  return (
    <>
      <Card>
        <CardContent>
          <ul className="divide-y">
            {points.map((point, i) => {
              const isActive = reduced || i === step;
              return (
                <li
                  key={point}
                  className={`flex items-start gap-3 py-3 transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <ShieldCheckIcon
                    className={`mt-0.5 transition-colors ${
                      isActive && !reduced ? "text-primary" : "text-secondary"
                    }`}
                  />
                  {point}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardContent className="overflow-x-auto">
          <div className="mx-auto flex w-full max-w-4xl min-w-xl flex-col gap-4">
            <div ref={ref} aria-hidden className="relative h-96 w-full">
              <div
                className="absolute inset-y-0 left-0 border-2 border-dashed border-secondary/50"
                style={{ width: `${pos.firewall[0]}%` }}
              />
              <Badge variant="outline" className="absolute top-2 left-2">
                LOCAL NETWORK
              </Badge>
              <Badge
                variant="outline"
                className="absolute top-2 right-2 text-muted-foreground"
              >
                INTERNET
              </Badge>
              <svg className="absolute inset-0 size-full">
                {links.map(([a, b]) => (
                  <line
                    key={`${a}-${b}`}
                    x1={`${pos[a][0]}%`}
                    y1={`${pos[a][1]}%`}
                    x2={`${pos[b][0]}%`}
                    y2={`${pos[b][1]}%`}
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    className={`transition-colors duration-500 ${
                      encrypted && a !== "firewall"
                        ? "animate-dash-flow stroke-secondary motion-reduce:animate-none"
                        : "stroke-muted-foreground/40"
                    }`}
                  />
                ))}
                {steps.flatMap(({ route: r }, s) =>
                  r.slice(0, -1).map(([a], j) => {
                    const b = r[j + 1][0];
                    const id = `sec-trail-${s}-${j}`;
                    const drawn = step === s && hop >= j + 1;
                    const head = step === s && hop === j + 1;
                    const coords = {
                      x1: `${pos[a][0]}%`,
                      y1: `${pos[a][1]}%`,
                      x2: `${pos[b][0]}%`,
                      y2: `${pos[b][1]}%`,
                    };
                    return (
                      <g key={id}>
                        <mask
                          id={id}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                        >
                          <line
                            {...coords}
                            stroke="white"
                            strokeWidth={8}
                            pathLength={1}
                            strokeDasharray={1}
                            strokeDashoffset={drawn ? 0 : 1}
                            className="transition-[stroke-dashoffset] duration-700 ease-in-out motion-reduce:transition-none"
                          />
                        </mask>
                        <line
                          {...coords}
                          strokeWidth={3}
                          strokeDasharray="6 6"
                          mask={`url(#${id})`}
                          className={`transition-opacity ${
                            head
                              ? "animate-dash-flow stroke-primary opacity-100 motion-reduce:animate-none"
                              : drawn
                                ? "stroke-primary opacity-50"
                                : "stroke-primary opacity-0"
                          }`}
                        />
                      </g>
                    );
                  }),
                )}
              </svg>
              {nodes.map((node) => {
                const [x, y] = pos[node.id];
                const isCloud = node.id === "cloud";
                const isFirewall = node.id === "firewall";
                const hit = isFirewall && step === 1 && hop === 1 && !idle;
                const here = atNode === node.id && !idle;
                const lit =
                  visited.includes(node.id) ||
                  (encrypted && node.id !== "cloud" && node.id !== "firewall");
                const denyState = isFirewall && blocked;
                return (
                  <div
                    key={node.id}
                    className={`absolute flex -translate-x-1/2 -translate-y-6 flex-col items-center gap-1 ${
                      isCloud ? "opacity-50" : ""
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className={`relative flex size-12 items-center justify-center border bg-background transition-[color,border-color,box-shadow] duration-300 ${
                        denyState
                          ? "border-destructive text-destructive shadow-[0_0_14px_-2px_var(--destructive)]"
                          : lit
                            ? "border-primary text-primary shadow-[0_0_14px_-2px_var(--primary)]"
                            : "text-muted-foreground"
                      } ${hit ? "animate-shake motion-reduce:animate-none" : ""}`}
                      style={hit ? { animationDelay: "650ms" } : undefined}
                    >
                      {here && (
                        <span
                          key={index}
                          className={`pointer-events-none absolute inset-0 animate-ring-out border-2 motion-reduce:hidden ${
                            hit ? "border-destructive" : "border-primary"
                          }`}
                          style={{ animationDelay: moving ? "600ms" : "0ms" }}
                        />
                      )}
                      <node.icon className="size-5" />
                    </div>
                    <span className="text-muted-foreground">{node.label}</span>
                  </div>
                );
              })}
              <Result on={stored} id="storage" place="right" dy={-0.7}>
                STORED LOCALLY
              </Result>
              <Result on={encrypted} id="storage" place="right" dy={0.7}>
                <LockIcon />
                AES-256
              </Result>
              <Result
                on={blocked}
                id="firewall"
                place="below"
                variant="destructive"
              >
                BLOCKED
              </Result>
              <Result on={authorised} id="auth" place="above">
                RBAC: ADMIN ✓
              </Result>
              <Result on={logged} id="log" place="above">
                config.change
              </Result>
              {encryptedLinks.map(([a, b], i) => {
                const [x, y] = midpoint(a, b);
                return (
                  <Badge
                    key={`${a}-${b}`}
                    variant="secondary"
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${encrypted ? "opacity-100" : "opacity-0"}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transitionDelay: encrypted ? `${i * 120}ms` : "0ms",
                    }}
                  >
                    <LockIcon />
                    TLS
                  </Badge>
                );
              })}
              {packet && (
                <Badge
                  variant={denied ? "destructive" : "default"}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 motion-reduce:transition-none ${
                    moving
                      ? "transition-[left,top,opacity] duration-700 ease-in-out"
                      : "transition-opacity duration-300"
                  } ${idle ? "opacity-0" : "opacity-100"} ${
                    denied ? "ring-2 ring-destructive/40" : ""
                  }`}
                  style={{
                    left: `${pos[atNode][0]}%`,
                    top: `${pos[atNode][1]}%`,
                  }}
                >
                  {packet}
                </Badge>
              )}
            </div>
            <div aria-hidden className="flex items-center gap-1">
              {steps.map((_, s) => {
                const { first, len } = stepRange[s];
                const fill =
                  s < step ? 1 : s === step ? (index - first + 1) / len : 0;
                return (
                  <div key={s} className="h-1 flex-1 bg-muted-foreground/20">
                    <div
                      className="h-full bg-primary transition-[width] duration-700 ease-linear motion-reduce:transition-none"
                      style={{ width: `${(reduced ? 1 : fill) * 100}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Result({
  on,
  id,
  place,
  dy = 0,
  variant = "secondary",
  children,
}: {
  on: boolean;
  id: NodeId;
  place: "above" | "below" | "right";
  dy?: number;
  variant?: "secondary" | "destructive";
  children: React.ReactNode;
}) {
  const [x, y] = pos[id];
  const style: React.CSSProperties =
    place === "right"
      ? { left: `calc(${x}% + 3.75rem)`, top: `calc(${y}% + ${dy}rem)` }
      : {
          left: `${x}%`,
          top: `calc(${y}% ${place === "above" ? "-" : "+"} 3.25rem)`,
        };
  return (
    <Badge
      variant={variant}
      className={`absolute transition-[opacity,translate] duration-500 ${
        place === "right" ? "-translate-y-1/2" : "-translate-x-1/2"
      } ${on ? "opacity-100" : "opacity-0"}`}
      style={style}
    >
      {children}
    </Badge>
  );
}
