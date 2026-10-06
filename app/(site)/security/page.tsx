import type { Metadata } from "next";
import { CtaBanner } from "@/components/capabilities/cta-banner";
import { CheckList } from "@/components/check-list";
import { FaqAccordion } from "@/components/faq-accordion";
import { FeatureCard } from "@/components/feature-card";
import { PageSection } from "@/components/page-section";
import { PlaceholderCard } from "@/components/placeholder-card";
import { Security } from "@/components/sections/security";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dataMap,
  faq,
  principles,
  weProvide,
  youDecide,
} from "@/content/security";

export const metadata: Metadata = {
  title: "Security",
  description:
    "SAMTEK processes and stores video on-premise, inside your network. How your data is handled, who can access it, and how it is protected.",
  robots: { index: false, follow: false },
};
const cell = "align-top whitespace-normal";

export default function SecurityPage() {
  return (
    <>
      <Security level={1} />
      <PageSection
        eyebrow="DATA_MAP.read()"
        title="Where your data lives."
        tinted
      >
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">DATA</TableHead>
                  <TableHead className="text-muted-foreground">
                    PROCESSED
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    STORED
                  </TableHead>
                  <TableHead className="text-primary">
                    LEAVES YOUR NETWORK
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataMap.map((row) => (
                  <TableRow key={row.data}>
                    <TableCell className={cell}>{row.data}</TableCell>
                    <TableCell className={`${cell} text-muted-foreground`}>
                      {row.processed}
                    </TableCell>
                    <TableCell className={`${cell} text-muted-foreground`}>
                      {row.stored}
                    </TableCell>
                    <TableCell className={`${cell} text-secondary`}>
                      {row.leaves}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </PageSection>
      <PageSection eyebrow="ACCESS.audit()" title="Access, audit & encryption.">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.slice(2).map((p) => (
            <FeatureCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              description={p.text}
            />
          ))}
        </div>
        <div className="mt-4">
          <PlaceholderCard title="Roles, logs and encryption details">
            Which roles exist and what each can do, what the audit log records
            and for how long, whether it can be exported, and the encryption
            algorithms and key management in use.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection
        eyebrow="RESPONSIBILITY.split()"
        title="Shared responsibility."
        tinted
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What SAMTEK provides</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList items={weProvide} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What you decide</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList items={youDecide} />
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <PlaceholderCard title="PDP Law and biometric data">
            A plain-language note on Indonesia&apos;s PDP Law and facial
            biometric data, written together with legal counsel.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection eyebrow="NETWORK.check()" title="Network & deployment.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How it runs</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckList
                items={[
                  "Runs inside your local network",
                  "Internet is optional, only for remote notifications",
                ]}
              />
            </CardContent>
          </Card>
          <PlaceholderCard title="Offline operation, updates and backup">
            Whether SAMTEK runs fully offline, how updates and patches reach an
            on-premise box, and how backup and redundancy work.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection
        eyebrow="TRUST.verify()"
        title="Certifications & reporting."
        tinted
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <PlaceholderCard title="Certifications and audits">
            Only the certifications and audits the company actually holds. Leave
            this out if there are none yet.
          </PlaceholderCard>
          <PlaceholderCard title="Report a vulnerability">
            The contact and process for security researchers who find a problem.
          </PlaceholderCard>
        </div>
      </PageSection>
      <PageSection eyebrow="FAQ.query()" title="Common questions.">
        <FaqAccordion items={faq} />
      </PageSection>
      <CtaBanner
        title="Talk to us about your security requirements."
        text="Tell us what your IT or legal team needs to see, and we will get back to you."
        topic="question"
      />
    </>
  );
}
