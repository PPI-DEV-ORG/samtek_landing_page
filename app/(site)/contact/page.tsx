import type { Metadata } from "next";
import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { company, mapsHref } from "@/content/about";
import { capabilityBySlug } from "@/content/capabilities";
import { isTopic, sectorOptions } from "@/lib/lead-options";

type Params = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo, a quote, or a trial license, ask about a custom AI model, or send us a question. We usually reply within 1–2 business days.",
};
const nextSteps = [
  "We review your request and reply within 1–2 business days.",
  "We run a short assessment of your existing CCTV infrastructure.",
  "A live edge-AI proof-of-concept on-site, without disrupting your production network.",
];
const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const topic = first(params.topic);
  const sector = first(params.sector);
  const capability = capabilityBySlug(first(params.capability) ?? "");
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          level={1}
          eyebrow="CONTACT.init()"
          title="Let's talk about your site."
        >
          <p className="max-w-xl text-muted-foreground">
            Request a demo or a quote, ask about a custom model, or just ask a
            question. We usually reply within 1–2 business days.
          </p>
        </SectionHeader>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm
            defaults={{
              topic: isTopic(topic) ? topic : "demo",
              sector: sectorOptions.some((s) => s.value === sector)
                ? (sector as string)
                : "",
              capability: capability
                ? { slug: capability.slug, name: capability.name }
                : undefined,
            }}
          />
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What happens next.</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="flex flex-col gap-3">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-extrabold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prefer to reach out directly.</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 text-primary hover:text-secondary"
                >
                  <MailIcon />
                  {company.email}
                </a>
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-secondary"
                >
                  <MessageCircleIcon />
                  WhatsApp {company.whatsapp.label}
                </a>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-secondary"
                >
                  <MapPinIcon className="mt-0.5 shrink-0" />
                  <span>
                    {company.legalName}
                    <br />
                    {company.address}
                  </span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
