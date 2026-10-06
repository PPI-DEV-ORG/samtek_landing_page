import type { Metadata } from "next";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { PageSection } from "@/components/page-section";
import { SectionHeader } from "@/components/section-header";
import { SectorCard } from "@/components/sectors/sector-card";
import { SectorMatrix } from "@/components/sectors/sector-matrix";
import { sectors } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "The same on-premise edge AI platform, assembled for retail, manufacturing, banking and government. Find the modules that fit your industry.",
  robots: { index: false, follow: false },
};

export default function SectorsPage() {
  return (
    <>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            level={1}
            eyebrow="SOLUTION_SECTORS.select()"
            title={"Four sectors,\none platform."}
            description="The same edge AI platform, assembled differently for each industry. Pick yours to see which modules fit, or tell us about a use case that is not listed."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>
      <PageSection
        eyebrow="MATRIX.map()"
        title="Which modules fit which sector."
        tinted
      >
        <SectorMatrix />
      </PageSection>
      <CtaBanner
        title="Your industry is not listed."
        text="Tell us what you need to detect. If it is not in the library, we can train a model for it."
      />
    </>
  );
}
