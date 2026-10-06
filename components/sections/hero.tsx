import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroCamera } from "@/components/sections/hero-camera";
import { HeroStats } from "@/components/sections/hero-stats";

export function Hero() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-6">
          <Badge variant="outline">
            ON-PREM · EDGE-FIRST · ZERO CLOUD DEPENDENCY
          </Badge>
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Your CCTV, now{" "}
            <span className="text-primary">AI vision infrastructure</span>.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            SAMTEK runs computer vision at the edge, on cameras you already own.
            Face, vehicle, PPE, and behavior detection — processed locally, data
            never leaving your network.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" nativeButton={false} render={<a href="#demo" />}>
              REQUEST_DEMO
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="#capabilities" />}
            >
              VIEW_AI_CAPABILITIES
            </Button>
          </div>
        </div>
        <HeroCamera />
      </div>
      <HeroStats />
    </section>
  );
}
