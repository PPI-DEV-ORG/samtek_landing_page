"use client";
import { HeroCamera } from "@/components/sections/hero-camera";
import { customScenario } from "@/lib/hero-scenarios";

const list = [customScenario];

export function CustomPanel() {
  return (
    <div className="self-center">
      <HeroCamera list={list} only={0} />
      <p className="mt-2 text-center text-muted-foreground">
        Illustrative example, not a client deployment.
      </p>
    </div>
  );
}
