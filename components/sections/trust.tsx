import { SectionHeader } from "@/components/section-header";
import { TrustWeb, type Client } from "@/components/sections/trust-web";

const logos: Client[] = [
  { name: "Unilever", logo: "/client/unilever.png" },
  { name: "United Tractors", logo: "/client/united-tractors.png" },
  { name: "Blibli", logo: "/client/blibli.png" },
  { name: "Iconnet", logo: "/client/iconnet.png" },
  { name: "Wastec International", logo: "/client/wastec.jpeg" },
  { name: "Garuda Yamato Steel", logo: "/client/gys.png" },
  { name: "Jasa Marga", logo: "/client/jasamarga.png" },
];
const clients: Client[] = Array.from(
  { length: 12 },
  (_, i) => logos[i % logos.length],
);

export function Trust() {
  return (
    <section id="trust" className="border-t bg-card/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="TRUSTED_BY.list()"
          title="Trusted deployments."
        />
        <TrustWeb clients={clients} />
      </div>
    </section>
  );
}
