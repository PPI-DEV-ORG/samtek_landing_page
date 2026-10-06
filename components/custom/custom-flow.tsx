"use client";
import {
  BrainCircuitIcon,
  ClipboardListIcon,
  RocketIcon,
  ScanEyeIcon,
  VideoIcon,
} from "lucide-react";
import { FlowSection } from "@/components/flow/flow-section";
import type { FlowStage } from "@/components/flow/flow-simulation";
import { logFragment } from "@/lib/text";

const icons = [
  ClipboardListIcon,
  VideoIcon,
  BrainCircuitIcon,
  ScanEyeIcon,
  RocketIcon,
];
const projects = ["PROJECT_A", "PROJECT_B", "PROJECT_C"];

export function CustomFlow({
  steps,
  tinted,
}: {
  steps: { title: string; text: string; payload: string }[];
  tinted?: boolean;
}) {
  const stages: FlowStage[] = steps.map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: s.title.toUpperCase(),
    payload: s.payload,
    icon: icons[i],
    desc: s.text,
  }));
  const logLine = (tick: number) => {
    const cycle = Math.floor(tick / steps.length);
    const i = tick % steps.length;
    return `[${stages[i].title}] ${projects[cycle % projects.length]} · ${logFragment(steps[i].text)}`;
  };
  return (
    <FlowSection
      tinted={tinted}
      eyebrow="PROCESS.run()"
      title="From brief to edge."
      stages={stages}
      logLine={logLine}
    />
  );
}
