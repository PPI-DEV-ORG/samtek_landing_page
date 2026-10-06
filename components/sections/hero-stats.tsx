"use client";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { useEasedProgress } from "@/hooks/use-eased-progress";

const heroStats = [
  { from: 0, to: 20, suffix: "+", label: "AI USE CASES" },
  { from: 480, to: 0, suffix: "ms", label: "CLOUD ROUND-TRIP" },
  { from: 0, to: 100, suffix: "%", label: "DATA ON-PREMISE" },
  { from: 0, to: 24, suffix: "/7", label: "EDGE INFERENCE" },
];
const DURATION_MS = 1400;

export function HeroStats() {
  const [ref, , seen] = useInView<HTMLDivElement>();
  const progress = useEasedProgress({ duration: DURATION_MS, active: seen });
  return (
    <div
      ref={ref}
      className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4"
    >
      {heroStats.map((stat) => {
        const value = Math.round(stat.from + (stat.to - stat.from) * progress);
        return (
          <Card key={stat.label}>
            <CardContent>
              <div className="text-3xl font-extrabold text-primary tabular-nums">
                <span className="sr-only">
                  {stat.to}
                  {stat.suffix}
                </span>
                <span aria-hidden>
                  {value}
                  {stat.suffix}
                </span>
              </div>
              <CardDescription>{stat.label}</CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
