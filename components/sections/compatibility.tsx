import { SectionHeader } from "@/components/section-header";
import { CompatibilityFlow } from "@/components/sections/compatibility-flow";

const compatProtocols = [
  "ONVIF Standard",
  "RTSP / RTMP Stream",
  "Generic IP Camera",
  "NVR / DVR existing",
];

const compatBrands = ["HIKVISION", "UNIVIEW", "GENERIC ONVIF"];

export function Compatibility() {
  return (
    <section
      id="compatibility"
      className="border-t bg-card/50 px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="COMPATIBILITY.check()"
          title="Built for your existing setup."
        >
          <p className="max-w-xl text-sm text-muted-foreground">
            No need to replace cameras or NVRs. SAMTEK connects to your existing
            stream through industry-standard protocols.
          </p>
        </SectionHeader>
        <CompatibilityFlow protocols={compatProtocols} brands={compatBrands} />
      </div>
    </section>
  );
}
