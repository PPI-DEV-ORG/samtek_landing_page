import { SectionHeader } from "@/components/section-header";
import { FaqAccordion } from "@/components/faq-accordion";

const faqItems = [
  {
    q: "Does SAMTEK need an internet connection?",
    a: "No. All AI inference and data storage run on-premise, inside your local network. Internet is only optional, for remote notifications.",
  },
  {
    q: "Do I need to replace my existing CCTV cameras?",
    a: "No. SAMTEK connects to existing cameras via standard protocols like ONVIF and RTSP, as long as the camera can output a digital video stream.",
  },
  {
    q: "How many AI use cases can run at once?",
    a: "It depends on the edge hardware capacity. Each use case can be enabled or disabled per camera based on operational needs.",
  },
  {
    q: "What is the SAMTEK licensing model?",
    a: "Licensing is calculated per camera and per AI module activated, with no cloud or bandwidth fees.",
  },
  {
    q: "Is data still safe if the on-premise server is compromised?",
    a: "SAMTEK applies encryption at-rest and in-transit, role-based access control, and audit logs across all system components.",
  },
  {
    q: "Is installation and onboarding support available?",
    a: "Yes. The SAMTEK team performs an infrastructure assessment, installs edge devices, and trains your staff on the dashboard on-site.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="FAQ.query()" title="FAQ." />
        <FaqAccordion className="mt-10" items={faqItems} defaultOpen={0} />
      </div>
    </section>
  );
}
