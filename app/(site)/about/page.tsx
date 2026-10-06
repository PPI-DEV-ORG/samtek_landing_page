import type { Metadata } from "next";
import Image from "next/image";
import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { FeatureCard } from "@/components/feature-card";
import { PageHero } from "@/components/page-hero";
import { PlaceholderCard } from "@/components/placeholder-card";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { company, mapsHref, principles, story } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "SAMTEK is an on-premise, edge-first AI video analytics platform built by PT Safanah Alvan Maksima in Bekasi, Indonesia.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT.info()"
        title={
          <>
            Vision AI that stays{" "}
            <span className="text-primary">on your premises</span>.
          </>
        }
        description={`SAMTEK is built by ${company.legalName}. It turns the CCTV cameras you already own into AI vision infrastructure, processed at the edge, with your data staying inside your network.`}
        visual={
          <Card className="self-center">
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/brand/samtek.png"
                  alt=""
                  width={627}
                  height={658}
                  className="h-20 w-auto"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-extrabold">
                    {company.product}
                  </span>
                  <span className="text-muted-foreground">
                    {company.tagline}
                  </span>
                </div>
              </div>
              <dl className="flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Company</dt>
                  <dd className="text-right">{company.legalName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Based in</dt>
                  <dd className="text-right">{company.city}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-right">Edge AI video analytics</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        }
      />
      <PageSection eyebrow="APPROACH.list()" title="How we build." tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <FeatureCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              description={p.text}
            />
          ))}
        </div>
      </PageSection>
      <PageSection eyebrow="STORY.read()" title="Our story.">
        {story ? (
          <div className="flex max-w-3xl flex-col gap-4 text-lg text-muted-foreground">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <PlaceholderCard title="Company story">
            How SAMTEK started, who it is built for, and where it is going. Add
            the paragraphs in <code>content/about.ts</code>.
          </PlaceholderCard>
        )}
      </PageSection>
      <PageSection eyebrow="CONTACT.info()" title="Find us." tinted>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{company.legalName}</CardTitle>
              <CardDescription>{company.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MapPinIcon data-icon="inline-start" />
                OPEN_IN_MAPS
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Talk to us</CardTitle>
              <CardDescription>
                Tell us about your site and cameras. We usually reply within 1–2
                business days.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={`mailto:${company.email}`} />}
              >
                <MailIcon data-icon="inline-start" />
                {company.email}
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={company.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MessageCircleIcon data-icon="inline-start" />
                WhatsApp {company.whatsapp.label}
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageSection>
      <CtaBanner
        title="Let's look at your site."
        text="Request a demo or quote. We will assess your existing CCTV and run a proof-of-concept on-site."
      />
    </>
  );
}
