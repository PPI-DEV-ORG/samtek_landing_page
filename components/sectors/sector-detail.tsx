import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { CapabilityCard } from "@/components/capabilities/capability-card";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { CheckList } from "@/components/check-list";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { PageSection as Section } from "@/components/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { capabilityBySlug, type Capability } from "@/content/capabilities";
import { sectors, type Sector } from "@/content/sectors";
import { contactHref } from "@/lib/links";
import { SectorCard } from "./sector-card";
import { SectorFlow } from "./sector-flow";

const toCapabilities = (slugs: string[]) =>
  slugs
    .map((slug) => capabilityBySlug(slug))
    .filter((c): c is Capability => Boolean(c));

export function SectorDetail({ sector }: { sector: Sector }) {
  const primary = toCapabilities(sector.primary);
  const relevant = toCapabilities(sector.relevant);
  const others = sectors.filter((s) => s.slug !== sector.slug);
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Sectors", href: "/sectors" },
          { label: sector.name },
        ]}
        eyebrow={`SECTOR / ${sector.num}`}
        title={`${sector.name}.`}
        description={sector.oneLiner}
        actions={
          <>
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link
                  href={contactHref({ topic: "demo", sector: sector.slug })}
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
              render={<Link href="/sectors" />}
            >
              ALL_SECTORS
            </Button>
          </>
        }
        visual={
          <Card className="self-center">
            <CardContent>
              <div className="relative aspect-16/10 overflow-hidden bg-muted">
                <Image
                  src={sector.image}
                  alt={sector.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between text-muted-foreground">
              <span>SECTOR {sector.num}</span>
              <span>{primary.length + relevant.length} RELEVANT MODULES</span>
            </CardFooter>
          </Card>
        }
      />
      <Section eyebrow="CHALLENGES.list()" title="What gets in the way.">
        <div className="grid gap-4 sm:grid-cols-2">
          {sector.challenges.map((challenge, i) => (
            <Card key={challenge}>
              <CardContent className="flex gap-4">
                <span className="text-2xl font-extrabold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-muted-foreground">{challenge}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      <Section eyebrow="MODULES.select()" title="Recommended modules." tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primary.map((c) => (
            <CapabilityCard key={c.slug} capability={c} />
          ))}
        </div>
        {relevant.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Also relevant</span>
            {relevant.map((c) => (
              <Badge
                key={c.slug}
                variant="outline"
                render={<Link href={`/capabilities/${c.slug}`} />}
              >
                {c.name}
              </Badge>
            ))}
          </div>
        )}
      </Section>
      <SectorFlow dayTitle={sector.dayTitle} stages={sector.day} />
      <Section eyebrow="DEPLOYMENT.check()" title="Fits how you work.">
        <Card>
          <CardContent>
            <CheckList items={sector.deployment} />
          </CardContent>
        </Card>
      </Section>
      <Section eyebrow="FAQ.query()" title="Common questions." tinted>
        <FaqAccordion items={sector.faq} />
      </Section>
      <Section eyebrow="SECTORS.list()" title="Other sectors.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <SectorCard key={s.slug} sector={s} />
          ))}
        </div>
      </Section>
      <CtaBanner
        title="See how this fits your site."
        text="Request a demo or quote. We will assess your existing CCTV and run a proof-of-concept on-site."
        sector={sector.slug}
      />
    </>
  );
}
