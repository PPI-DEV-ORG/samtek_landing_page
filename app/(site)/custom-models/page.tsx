import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClockIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { CustomFlow } from "@/components/custom/custom-flow";
import { CustomPanel } from "@/components/custom/custom-panel";
import { CheckList } from "@/components/check-list";
import { FaqAccordion } from "@/components/faq-accordion";
import { FeatureCard } from "@/components/feature-card";
import { PageHero } from "@/components/page-hero";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  bring,
  dataPrivacy,
  examples,
  faq,
  get,
  ownership,
  processSteps,
  timing,
  whenCustom,
} from "@/content/custom-models";
import { contactHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Custom AI models",
  description:
    "When the ready-made modules do not cover your case, SAMTEK trains a model for exactly what you need to detect and runs it on the same on-premise edge platform.",
  robots: { index: false, follow: false },
};

export default function CustomModelsPage() {
  return (
    <>
      <PageHero
        eyebrow="CUSTOM_AI.train()"
        title={
          <>
            Your use case. <span className="text-primary">Your model.</span>
          </>
        }
        description="The 24 ready-made modules cover the common cases. When yours is different, we build and train a model for exactly what you need to detect, and run it on the same on-premise edge platform."
        actions={
          <>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={contactHref({ topic: "custom" })} />}
            >
              TELL_US_WHAT_TO_DETECT
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/capabilities" />}
            >
              SEE_READY_MADE_MODULES
            </Button>
          </>
        }
        visual={<CustomPanel />}
      />
      <PageSection eyebrow="WHEN.check()" title="When custom makes sense.">
        <div className="grid gap-4 md:grid-cols-3">
          {whenCustom.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.text}
            />
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="EXAMPLES.list()"
        title="What can be detected."
        tinted
      >
        <p className="mb-6 text-sm text-muted-foreground">
          Illustrative examples of the kind of thing a custom model can do.
          These are not client projects.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.text}>
              <CardContent className="flex items-start gap-3">
                <example.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                <p>{example.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
      <CustomFlow steps={processSteps} />
      <PageSection
        eyebrow="SCOPE.define()"
        title="What you bring, what you get."
        tinted
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What we need from you</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList items={bring} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What you get</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList items={get} />
            </CardContent>
          </Card>
        </div>
      </PageSection>
      <PageSection eyebrow="TERMS.read()" title="Data, ownership & timing.">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <ShieldCheckIcon className="size-5 text-primary" />
              <CardTitle>Data & privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                {dataPrivacy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <KeyRoundIcon className="size-5 text-primary" />
              <CardTitle>Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{ownership}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <ClockIcon className="size-5 text-primary" />
              <CardTitle>Timing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{timing}</p>
            </CardContent>
          </Card>
        </div>
      </PageSection>
      <PageSection eyebrow="FAQ.query()" title="Common questions." tinted>
        <FaqAccordion items={faq} />
      </PageSection>
      <CtaBanner
        title="Have a use case in mind."
        text="Describe it and we will tell you what is possible."
        topic="custom"
      />
    </>
  );
}
