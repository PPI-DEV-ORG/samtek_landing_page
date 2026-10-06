import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { ArrowRightIcon } from "lucide-react";
import { CapabilitiesGrid } from "@/components/sections/capabilities-grid";
import { Button } from "@/components/ui/button";
import { capabilities, moduleId } from "@/content/capabilities";

const items = capabilities.map((c) => ({
  id: moduleId(c),
  name: c.name,
  desc: c.oneLiner,
  slug: c.slug,
}));

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="AI_CAPABILITIES.list()"
          title="One edge platform."
          description="Every use case runs as an independent module on SAMTEK's inference engine — activate what you need, with no extra cloud licensing."
        />
        <CapabilitiesGrid items={items} />
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/capabilities" />}
          >
            VIEW_ALL_CAPABILITIES
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
