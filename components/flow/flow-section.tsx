import {
  FlowSimulation,
  type FlowStage,
} from "@/components/flow/flow-simulation";
import { SectionHeader } from "@/components/section-header";

export function FlowSection({
  id,
  eyebrow,
  title,
  stages,
  logLine,
  tinted,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  stages: FlowStage[];
  logLine: (tick: number) => string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`border-t px-6 py-16 md:py-24 ${tinted ? "bg-card/50" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <FlowSimulation
          stages={stages}
          logLine={logLine}
          header={<SectionHeader eyebrow={eyebrow} title={title} />}
        />
      </div>
    </section>
  );
}
