import Link from "next/link";
import {
  ArrowRightIcon,
  InfoIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";
import { CheckList } from "@/components/check-list";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { PageSection as Section } from "@/components/page-section";
import { HeroCamera } from "@/components/sections/hero-camera";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  capabilityBySlug,
  categoryById,
  moduleId,
  sectorNames,
  type Capability,
} from "@/content/capabilities";
import { contactHref } from "@/lib/links";
import { CapabilityCard } from "./capability-card";
import { CapabilityFlow } from "./capability-flow";
import { CtaBanner } from "./cta-banner";
import { ModulePanel } from "./module-panel";

const heroScenario: Record<string, number> = {
  "face-recognition": 0,
  "ppe-detection": 1,
  "license-plate-recognition": 2,
  "intrusion-detection": 3,
};
const defaultPrivacyText =
  "Processing runs on-premise, inside your network, and video does not leave it. Access is controlled with role-based permissions and audit logs. Use should follow your internal policy and the data protection rules that apply to you, such as Indonesia's PDP Law.";

export function CapabilityDetail({
  capability: c,
}: {
  capability: Capability;
}) {
  const category = categoryById(c.category);
  const scenarioIndex = heroScenario[c.slug];
  const sectors = [...c.sectors].sort(
    (a, b) => Number(b.level === "primary") - Number(a.level === "primary"),
  );
  const related = c.related
    .map((slug) => capabilityBySlug(slug))
    .filter((x): x is Capability => Boolean(x))
    .slice(0, 3);
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Capabilities", href: "/capabilities" },
          { label: category.name },
          { label: c.name },
        ]}
        eyebrow={`CAPABILITY / ${moduleId(c)}`}
        title={`${c.name}.`}
        description={c.oneLiner}
        badges={
          <>
            <Badge variant="outline" className="uppercase">
              {category.name}
            </Badge>
            {c.tier === "featured" && <Badge>FEATURED</Badge>}
          </>
        }
        actions={
          <>
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link
                  href={contactHref({ topic: "demo", capability: c.slug })}
                />
              }
            >
              REQUEST_DEMO
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/capabilities" />}
            >
              ALL_CAPABILITIES
            </Button>
          </>
        }
        visual={
          scenarioIndex !== undefined ? (
            <HeroCamera only={scenarioIndex} />
          ) : (
            <ModulePanel capability={c} />
          )
        }
      />
      <Section eyebrow="THE_PROBLEM" title="Why it matters.">
        <p className="max-w-3xl text-lg text-muted-foreground">{c.problem}</p>
      </Section>
      <CapabilityFlow steps={c.steps} />
      <Section eyebrow="OUTPUT.schema()" title="What you get.">
        <div className={`grid gap-4 ${c.actions ? "lg:grid-cols-2" : ""}`}>
          <Card>
            <CardHeader>
              <CardTitle>Data it produces</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {c.outputs.map((field) => (
                  <Badge key={field} variant="outline">
                    {field}
                  </Badge>
                ))}
              </div>
              {c.outputsExtra?.map((extra) => (
                <p key={extra.label} className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {extra.label}:
                  </span>{" "}
                  {extra.value}
                </p>
              ))}
              {c.outputsNote && (
                <CardDescription>{c.outputsNote}</CardDescription>
              )}
            </CardContent>
          </Card>
          {c.actions && (
            <Card>
              <CardHeader>
                <CardTitle>What it can trigger</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {c.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2">
                      <ArrowRightIcon className="mt-0.5 shrink-0 text-primary" />
                      {action}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
      <Section eyebrow="SCENARIOS.list()" title="Where it helps." tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.scenarios.map((scenario, i) => (
            <Card key={scenario}>
              <CardHeader>
                <span className="text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base">{scenario}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        {sectors.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Used in</span>
            {sectors.map((s) => (
              <Badge
                key={s.slug}
                variant={s.level === "primary" ? "default" : "outline"}
                render={<Link href={`/sectors/${s.slug}`} />}
              >
                {sectorNames[s.slug]}
              </Badge>
            ))}
          </div>
        )}
      </Section>
      <Section eyebrow="REQUIREMENTS.check()" title="Camera & deployment.">
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent>
              <CheckList
                items={[
                  ...c.camera,
                  ...(c.facts ?? []).map((fact) => (
                    <span key={fact.label}>
                      <span className="font-bold">{fact.label}:</span>{" "}
                      {fact.value}
                    </span>
                  )),
                ]}
              />
            </CardContent>
          </Card>
          {c.notice && (
            <Alert role="note">
              <InfoIcon />
              <AlertTitle>Good to know</AlertTitle>
              <AlertDescription>{c.notice}</AlertDescription>
            </Alert>
          )}
          {c.privacy && (
            <Alert role="note">
              <ShieldCheckIcon />
              <AlertTitle>Privacy &amp; compliance</AlertTitle>
              <AlertDescription>
                {c.privacyText ?? defaultPrivacyText}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Section>
      {c.faq && (
        <Section eyebrow="FAQ.query()" title="Common questions." tinted>
          <FaqAccordion items={c.faq} />
        </Section>
      )}
      <section className="border-t px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Card className="border-dashed">
            <CardContent className="flex flex-wrap items-center justify-between gap-6 py-4">
              <div className="flex max-w-2xl gap-4">
                <SparklesIcon className="mt-1 size-5 shrink-0 text-primary" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-extrabold">
                    Made to fit your use case.
                  </h2>
                  <p className="text-muted-foreground">
                    We train custom models for your exact use case. For example:{" "}
                    {c.custom.charAt(0).toLowerCase() + c.custom.slice(1)}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={<Link href="/custom-models" />}
              >
                CUSTOM_AI
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      {related.length > 0 && (
        <Section eyebrow="RELATED.list()" title="Related capabilities." tinted>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CapabilityCard key={r.slug} capability={r} />
            ))}
          </div>
        </Section>
      )}
      <CtaBanner
        title={`Put ${c.name} on your cameras.`}
        text="Request a demo or quote. We will assess your existing CCTV and run a proof-of-concept on-site."
        capability={c.slug}
      />
    </>
  );
}
