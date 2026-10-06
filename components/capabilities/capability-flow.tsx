"use client";
import { BellRingIcon, CameraIcon, CpuIcon } from "lucide-react";
import { FlowSection } from "@/components/flow/flow-section";
import type { FlowStage } from "@/components/flow/flow-simulation";
import { logFragment } from "@/lib/text";

const stageIcons = [CameraIcon, CpuIcon, BellRingIcon];
const payloads = ["STREAM", "FRAMES", "RESULT"];
const cameras = ["CAM_04", "CAM_11", "CAM_07", "CAM_02"];
const latencies = [12, 9, 14, 11];
const upper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function CapabilityFlow({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  const stages: FlowStage[] = steps.map((step, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: step.title.replace(/:$/, "").toUpperCase(),
    payload: payloads[i],
    icon: stageIcons[i],
    desc: upper(step.text),
  }));
  const logLine = (tick: number) => {
    const cycle = Math.floor(tick / steps.length);
    const i = tick % steps.length;
    const title = stages[i].title;
    const text = logFragment(steps[i].text);
    if (i === 0)
      return `[${title}] ${cameras[cycle % cameras.length]} · ${text}`;
    if (i === steps.length - 1) return `[${title}] ${text} · dashboard updated`;
    return `[${title}] edge-node-01 · ${latencies[cycle % latencies.length]}ms · ${text}`;
  };
  return (
    <FlowSection
      tinted
      eyebrow="HOW_IT_WORKS.exec()"
      title="How it works."
      stages={stages}
      logLine={logLine}
    />
  );
}
