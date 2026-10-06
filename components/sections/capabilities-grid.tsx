"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronDownIcon, ScanEyeIcon } from "lucide-react";
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
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Capability = { id: string; name: string; desc: string; slug: string };

const SCAN_MS = 700;
const INITIAL_COUNT = 8;

export function CapabilitiesGrid({ items }: { items: Capability[] }) {
  const [expanded, setExpanded] = React.useState(false);
  const [tick, setTick] = React.useState(0);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [ref, inView, revealed] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  React.useEffect(() => {
    if (!inView || reduced || hovered !== null) return;
    const id = setInterval(() => setTick((t) => t + 1), SCAN_MS);
    return () => clearInterval(id);
  }, [inView, reduced, hovered]);
  const scanning = revealed && !reduced;
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);
  const active = !scanning ? -1 : (hovered ?? tick % visible.length);
  return (
    <div ref={ref} className="mt-10 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="outline" className={scanning ? "" : "opacity-50"}>
          {hovered !== null ? "INSPECT" : "SCANNING"}
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((cap, i) => {
          const isActive = i === active;
          return (
            <Link
              key={cap.id}
              href={`/capabilities/${cap.slug}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="group block h-full outline-none"
            >
              <Card
                className={`h-full transition-colors group-focus-visible:border-primary ${
                  isActive ? "border-primary" : ""
                } ${
                  revealed || reduced
                    ? "animate-in fill-mode-backwards duration-500 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${(i % 4) * 80 + (Math.floor(i / 4) % 2) * 40}ms`,
                }}
              >
                <CardHeader>
                  <CardDescription>{cap.id}</CardDescription>
                  <CardAction>
                    <ScanEyeIcon
                      className={`size-4 transition-colors ${
                        isActive || !scanning
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <CardTitle>{cap.name}</CardTitle>
                  <CardDescription>{cap.desc}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded
            ? "SHOW_LESS"
            : `SHOW_MORE (${items.length - INITIAL_COUNT})`}
          <ChevronDownIcon
            data-icon="inline-end"
            className={expanded ? "rotate-180" : ""}
          />
        </Button>
      </div>
    </div>
  );
}
