"use client";
import { FlowSection } from "@/components/flow/flow-section";
import type { FlowStage } from "@/components/flow/flow-simulation";
import { icons, installSteps } from "@/content/download";
import { logFragment } from "@/lib/text";

const stages: FlowStage[] = installSteps.map((s, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: s.title.toUpperCase(),
  payload: s.payload,
  icon: icons[i],
  desc: s.text,
}));
const sites = ["SITE_A", "SITE_B", "SITE_C"];

function logLine(tick: number) {
  const cycle = Math.floor(tick / stages.length);
  const i = tick % stages.length;
  return `[${stages[i].title}] ${sites[cycle % sites.length]} · ${logFragment(installSteps[i].text)}`;
}

export function DownloadFlow({ tinted }: { tinted?: boolean }) {
  return (
    <FlowSection
      tinted={tinted}
      eyebrow="INSTALL.run()"
      title="From download to detection."
      stages={stages}
      logLine={logLine}
    />
  );
}
