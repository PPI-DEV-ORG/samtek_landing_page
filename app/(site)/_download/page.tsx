import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { CheckList } from "@/components/check-list";
import { DownloadFlow } from "@/components/download/download-flow";
import { DownloadButton } from "@/components/download/download-button";
import { DownloadPanel } from "@/components/download/download-panel";
import { FaqAccordion } from "@/components/faq-accordion";
import { FeatureCard } from "@/components/feature-card";
import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { PlaceholderCard } from "@/components/placeholder-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { before, components, faq, trialSteps } from "@/content/download";
import { contactHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download SAMTEK: VMS, API, and Edge in one package, installed on-premise inside your network.",
  robots: { index: false, follow: false },
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="DOWNLOAD.get()"
        title={
          <>
            One package. <span className="text-primary">VMS, API, Edge.</span>
          </>
        }
        description="Everything SAMTEK needs ships as a single 3-in-1 installer. Install it inside your network, request a trial license to activate it, and connect the cameras you already have."
        actions={
          <>
            <DownloadButton />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href={contactHref({ topic: "trial" })} />}
            >
              REQUEST_TRIAL_LICENSE
            </Button>
          </>
        }
        visual={<DownloadPanel />}
      />
      <PageSection eyebrow="INCLUDES.list()" title="Three in one." tinted>
        <div className="grid gap-4 md:grid-cols-3">
          {components.map((c) => (
            <FeatureCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              description={c.text}
            />
          ))}
        </div>
      </PageSection>
      <DownloadFlow />
      <PageSection
        eyebrow="TRIAL.request()"
        title="Activate with a trial license."
        tinted
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How to get one</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <CheckList items={trialSteps} />
              <Button
                size="lg"
                className="self-start"
                nativeButton={false}
                render={<Link href={contactHref({ topic: "trial" })} />}
              >
                REQUEST_TRIAL_LICENSE
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
          <PlaceholderCard title="Trial terms">
            How long the trial runs, any limits on cameras or modules, and what
            happens when it ends or how to move to a full license.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection eyebrow="REQUIREMENTS.check()" title="Before you install.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What you need</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList items={before} />
            </CardContent>
          </Card>
          <PlaceholderCard title="System requirements">
            Supported operating systems, CPU and GPU, RAM, and disk, ideally
            sized by number of cameras and active modules.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection
        eyebrow="RELEASE.verify()"
        title="Activation & releases."
        tinted
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <PlaceholderCard title="Activation on an on-premise server">
            How to tell us which device to verify, and whether the server still
            needs internet after it is activated.
          </PlaceholderCard>
          <PlaceholderCard title="Versions, checksums and release notes">
            The current version, a checksum to verify the download, and what
            changed in each release.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection eyebrow="FAQ.query()" title="Common questions.">
        <FaqAccordion items={faq} />
      </PageSection>
      <CtaBanner
        title="Need help getting set up."
        text="Tell us about your site and cameras, and we will help with the install."
        topic="question"
      />
    </>
  );
}
