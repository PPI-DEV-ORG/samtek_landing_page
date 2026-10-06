"use client";
import { capabilityIcon } from "@/components/capabilities/capability-icon";
import { FlowSection } from "@/components/flow/flow-section";
import type { FlowStage } from "@/components/flow/flow-simulation";
import type { SectorStage } from "@/content/sectors";
import { logFragment } from "@/lib/text";

const cameras = ["CAM_04", "CAM_11", "CAM_07", "CAM_02"];

export function SectorFlow({
  dayTitle,
  stages: day,
}: {
  dayTitle: string;
  stages: SectorStage[];
}) {
  const stages: FlowStage[] = day.map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: s.title.toUpperCase(),
    payload: s.payload,
    icon: capabilityIcon(s.module),
    desc: s.text,
  }));
  const logLine = (tick: number) => {
    const cycle = Math.floor(tick / day.length);
    const i = tick % day.length;
    return `[${stages[i].title}] ${cameras[(cycle + i) % cameras.length]} · ${logFragment(day[i].text)}`;
  };
  return (
    <FlowSection
      tinted
      eyebrow="DAILY_FLOW.run()"
      title={dayTitle}
      stages={stages}
      logLine={logLine}
    />
  );
}
