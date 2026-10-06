"use client";
import * as React from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type Client = { name: string; logo?: string };
type View = { x: number; y: number; k: number };

const SPOKES = 12;
const RINGS = [160, 260, 360, 460];
const INNER_R = 260;
const OUTER_R = 460;
const NODE_W = 160;
const NODE_H = 80;
const HUB = 144;
const EXTENT = 560;
// On narrow screens the frame is landscape and opens at a fixed zoom.
const COMPACT_WIDTH = 640;
const COMPACT_ZOOM = 0.3;
const RADAR_R = OUTER_R + 60;
const RADAR_CLIP = `polygon(${Array.from({ length: SPOKES }, (_, i) => {
  const a = ((360 / SPOKES) * i * Math.PI) / 180;
  return `${(50 + 50 * Math.cos(a)).toFixed(3)}% ${(50 + 50 * Math.sin(a)).toFixed(3)}%`;
}).join(",")})`;
const DOT_GRID = 28;
const MIN_K = 0.3;
const MAX_K = 3;
const clamp = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));
const round = (n: number) => Math.round(n * 1e6) / 1e6;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  const cos = round(Math.cos(a));
  const sin = round(Math.sin(a));
  return { x: round(r * cos), y: round(r * sin), cos, sin };
};
const exitDist = (cos: number, sin: number, hw: number, hh: number) =>
  Math.min(
    hw / Math.max(Math.abs(cos), 1e-6),
    hh / Math.max(Math.abs(sin), 1e-6),
  );
const webPoints = (r: number) =>
  Array.from({ length: SPOKES }, (_, i) => {
    const p = polar(r, (360 / SPOKES) * i);
    return `${p.x},${p.y}`;
  }).join(" ");

function layout(clients: Client[]) {
  const inner = clients.slice(0, 6);
  const outer = clients.slice(6);
  return [
    ...inner.map((client, i) => ({
      client,
      r: INNER_R,
      ...polar(INNER_R, (360 / inner.length) * i),
    })),
    ...outer.map((client, i) => ({
      client,
      r: OUTER_R,
      ...polar(OUTER_R, (360 / outer.length) * i + 180 / outer.length),
    })),
  ];
}

export function TrustWeb({ clients }: { clients: Client[] }) {
  const [inViewRef, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const viewport = React.useRef<HTMLDivElement | null>(null);
  const setViewport = React.useCallback(
    (el: HTMLDivElement | null) => {
      viewport.current = el;
      inViewRef.current = el;
    },
    [inViewRef],
  );
  const [view, setView] = React.useState<View>({ x: 0, y: 0, k: 0.7 });
  const [dragging, setDragging] = React.useState(false);
  const fit = React.useRef(0.7);
  const touched = React.useRef(false);
  const pointers = React.useRef(new Map<number, { x: number; y: number }>());
  const nodes = React.useMemo(() => layout(clients), [clients]);
  React.useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      fit.current =
        width < COMPACT_WIDTH
          ? COMPACT_ZOOM
          : Math.min(1, Math.min(width, height) / (EXTENT * 2));
      if (!touched.current) setView({ x: 0, y: 0, k: fit.current });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const zoomAt = React.useCallback((cx: number, cy: number, factor: number) => {
    touched.current = true;
    setView((v) => {
      const k = clamp(v.k * factor);
      const wx = (cx - v.x) / v.k;
      const wy = (cy - v.y) / v.k;
      return { k, x: cx - wx * k, y: cy - wy * k };
    });
  }, []);
  const centreOffset = React.useCallback((clientX: number, clientY: number) => {
    const rect = viewport.current!.getBoundingClientRect();
    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
    };
  }, []);
  React.useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const c = centreOffset(e.clientX, e.clientY);
      zoomAt(c.x, c.y, Math.exp(-e.deltaY * 0.002));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, centreOffset]);
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    touched.current = true;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    if (pointers.current.size === 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (pointers.current.size === 2) {
      const other = [...pointers.current.entries()].find(
        ([id]) => id !== e.pointerId,
      )![1];
      const before = Math.hypot(prev.x - other.x, prev.y - other.y);
      const after = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      if (before > 0) {
        const c = centreOffset(
          (e.clientX + other.x) / 2,
          (e.clientY + other.y) / 2,
        );
        zoomAt(c.x, c.y, after / before);
      }
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setDragging(false);
  };
  const reset = () => {
    touched.current = false;
    setView({ x: 0, y: 0, k: fit.current });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 40;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    if (e.key in moves) {
      e.preventDefault();
      touched.current = true;
      const [dx, dy] = moves[e.key];
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (e.key === "+" || e.key === "=") zoomAt(0, 0, 1.2);
    else if (e.key === "-") zoomAt(0, 0, 1 / 1.2);
    else if (e.key === "0") reset();
  };
  const hubReach = (cos: number, sin: number) =>
    exitDist(cos, sin, HUB / 2, HUB / 2) + 6;
  return (
    <Card className="mt-10 bg-background py-0">
      <div
        ref={setViewport}
        role="application"
        aria-label="Map of SAMTEK client deployments. Drag to pan, plus and minus to zoom."
        tabIndex={0}
        className={`relative aspect-4/3 touch-none md:aspect-auto md:h-160 overflow-hidden outline-none select-none focus-visible:ring-1 focus-visible:ring-ring ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--color-muted-foreground) 35%, transparent) 1.2px, transparent 1.2px)",
          backgroundSize: `${DOT_GRID * view.k}px ${DOT_GRID * view.k}px`,
          backgroundPosition: `calc(50% + ${view.x}px) calc(50% + ${view.y}px)`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 origin-top-left"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute motion-reduce:hidden"
            style={{
              left: -RADAR_R,
              top: -RADAR_R,
              width: RADAR_R * 2,
              height: RADAR_R * 2,
              clipPath: RADAR_CLIP,
            }}
          >
            <div
              className="size-full animate-spin"
              style={{
                animationDuration: "8s",
                animationTimingFunction: "linear",
                animationPlayState: inView ? "running" : "paused",
                background:
                  "conic-gradient(from 0deg, transparent 0deg 290deg, color-mix(in oklab, var(--color-primary) 22%, transparent) 360deg)",
              }}
            />
          </div>
          <svg
            aria-hidden
            width={1}
            height={1}
            className="pointer-events-none absolute top-0 left-0 overflow-visible"
          >
            {RINGS.map((r) => (
              <polygon
                key={r}
                points={webPoints(r)}
                fill="none"
                strokeWidth={1}
                className="stroke-muted-foreground/25"
              />
            ))}
            {Array.from({ length: SPOKES }, (_, i) => {
              const p = polar(OUTER_R, (360 / SPOKES) * i);
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={p.x}
                  y2={p.y}
                  strokeWidth={1}
                  className="stroke-muted-foreground/25"
                />
              );
            })}
            {[0, 1.5].map((delay) => (
              <polygon
                key={delay}
                points={webPoints(RINGS[RINGS.length - 1])}
                fill="none"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                className="animate-web-pulse stroke-primary motion-reduce:hidden"
                style={{
                  animationDelay: `${delay}s`,
                  animationPlayState: inView ? "running" : "paused",
                }}
              />
            ))}
            {nodes.map(({ r, cos, sin }, idx) => {
              const start = r - exitDist(cos, sin, NODE_W / 2, NODE_H / 2) - 6;
              const tip = hubReach(cos, sin);
              const base = tip + 10;
              const nx = -sin;
              const ny = cos;
              return (
                <g key={idx}>
                  <line
                    x1={cos * start}
                    y1={sin * start}
                    x2={cos * base}
                    y2={sin * base}
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    className={`stroke-primary motion-reduce:animate-none ${
                      inView ? "animate-dash-flow" : ""
                    }`}
                  />
                  <polygon
                    points={[
                      `${cos * tip},${sin * tip}`,
                      `${cos * base + nx * 5},${sin * base + ny * 5}`,
                      `${cos * base - nx * 5},${sin * base - ny * 5}`,
                    ].join(" ")}
                    className="fill-primary"
                  />
                  {!reduced && inView && (
                    <rect
                      x={-3}
                      y={-3}
                      width={6}
                      height={6}
                      className="fill-secondary"
                    >
                      <animateMotion
                        dur="2.4s"
                        begin={`${((idx * 0.37) % 2.4).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={`M ${cos * start} ${sin * start} L ${cos * tip} ${sin * tip}`}
                      />
                    </rect>
                  )}
                </g>
              );
            })}
          </svg>
          {nodes.map(({ client, x, y }, idx) => (
            <Card
              key={idx}
              size="sm"
              className="absolute -translate-x-1/2 -translate-y-1/2 border-dashed py-0"
              style={{ left: x, top: y, width: NODE_W, height: NODE_H }}
            >
              <CardContent
                className={`flex flex-1 items-center justify-center text-muted-foreground ${
                  client.logo ? "px-4" : ""
                }`}
              >
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={128}
                    height={56}
                    draggable={false}
                    className="max-h-12 w-auto max-w-full object-contain mix-blend-screen grayscale invert"
                  />
                ) : (
                  "YOUR_LOGO"
                )}
              </CardContent>
            </Card>
          ))}
          <Card
            className="absolute -translate-x-1/2 -translate-y-1/2 items-center justify-center border-primary py-0"
            style={{ left: 0, top: 0, width: HUB, height: HUB }}
          >
            <Image
              src="/brand/samtek.png"
              alt="SAMTEK"
              width={627}
              height={658}
              draggable={false}
              className="h-24 w-auto"
            />
          </Card>
        </div>
        <div
          className="absolute top-3 right-3 flex items-center gap-2"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Badge variant="outline">{Math.round(view.k * 100)}%</Badge>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Zoom in"
            onClick={() => zoomAt(0, 0, 1.25)}
          >
            <PlusIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Zoom out"
            onClick={() => zoomAt(0, 0, 1 / 1.25)}
          >
            <MinusIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Reset view"
            onClick={reset}
          >
            <RotateCcwIcon />
          </Button>
        </div>
        <Badge
          variant="outline"
          className="pointer-events-none absolute bottom-3 left-3"
        >
          <span className="sm:hidden">DRAG · PINCH TO ZOOM</span>
          <span className="hidden sm:inline">
            DRAG TO PAN · PINCH / CTRL + SCROLL TO ZOOM
          </span>
        </Badge>
        <Badge
          variant="outline"
          className="pointer-events-none absolute right-3 bottom-3 hidden md:inline-flex"
        >
          {nodes.length} CLIENTS · {nodes.length} SECURE LINKS
        </Badge>
      </div>
    </Card>
  );
}
