import type { Metadata } from "next";
import { CapabilitiesBrowser } from "@/components/capabilities/capabilities-browser";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { SectionHeader } from "@/components/section-header";
import { capabilities } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Ready-made AI modules for the cameras you already own: face, vehicle, PPE, behavior and analytics, all processed on-premise.",
  robots: { index: false, follow: false },
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            level={1}
            eyebrow="AI_CAPABILITIES.list()"
            title={`${capabilities.length} AI modules.\nOne edge platform.`}
            description="Pick a module to see how it works, what data it produces, and what your cameras need. Everything runs on-premise, with no cloud dependency."
          />
          <CapabilitiesBrowser />
        </div>
      </section>
      <CtaBanner
        title="Find the right modules for your site."
        text="Tell us about your site and cameras. We will suggest a setup and prepare a quote."
      />
    </>
  );
}
