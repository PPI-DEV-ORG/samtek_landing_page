"use client";
import { SectionHeader } from "@/components/section-header";
import * as React from "react";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { submitContact } from "@/app/(site)/contact/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactState } from "@/lib/lead-options";

export function Demo() {
  const [state, formAction, pending] = React.useActionState(submitContact, {
    status: "idle",
  } as ContactState);
  return (
    <section id="demo" className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-2">
        <SectionHeader eyebrow="REQUEST_DEMO.init()" title="Request a demo.">
          <p className="text-sm text-muted-foreground">
            Our team runs a short assessment of your existing CCTV
            infrastructure, then a live edge-AI proof-of-concept on-site —
            without disrupting your production network.
          </p>
        </SectionHeader>
        {state.status === "success" ? (
          <Alert>
            <CircleCheckIcon />
            <AlertTitle>
              &gt; STATUS: 200_OK — Demo request received.
            </AlertTitle>
            <AlertDescription>
              Our team will reach out via the email/WhatsApp you provided within
              1–2 business days.
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardContent>
              <form action={formAction}>
                <FieldGroup>
                  {state.status === "error" && state.message && (
                    <Alert variant="destructive">
                      <TriangleAlertIcon />
                      <AlertTitle>Request not sent</AlertTitle>
                      <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                  )}
                  <input type="hidden" name="topic" value="demo" />
                  <div aria-hidden className="absolute left-[-9999px]">
                    <label>
                      Website
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="demo-name">Full name</FieldLabel>
                    <Input
                      id="demo-name"
                      name="name"
                      placeholder="Full name"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="demo-company">Company</FieldLabel>
                    <Input
                      id="demo-company"
                      name="company"
                      placeholder="Company"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="demo-email">Work email</FieldLabel>
                    <Input
                      id="demo-email"
                      name="email"
                      type="email"
                      placeholder="Work email"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="demo-phone">
                      WhatsApp number
                    </FieldLabel>
                    <Input
                      id="demo-phone"
                      name="phone"
                      type="tel"
                      placeholder="WhatsApp number"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="demo-message">
                      Your analytics needs
                    </FieldLabel>
                    <Textarea
                      id="demo-message"
                      name="message"
                      placeholder="Tell us about your analytics needs"
                    />
                  </Field>
                  <Button type="submit" size="lg" disabled={pending}>
                    {pending ? "SENDING…" : "SUBMIT_REQUEST"}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
