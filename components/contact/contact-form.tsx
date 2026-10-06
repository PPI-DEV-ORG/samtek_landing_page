"use client";
import * as React from "react";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { submitContact } from "@/app/(site)/contact/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  cameraOptions,
  sectorOptions,
  topics,
  type ContactState,
  type FormValues,
  type Topic,
} from "@/lib/lead-options";

const idle: ContactState = { status: "idle" };

export function ContactForm({
  defaults,
}: {
  defaults: {
    topic: Topic;
    sector: string;
    capability?: { slug: string; name: string };
  };
}) {
  const [state, formAction, pending] = React.useActionState(
    submitContact,
    idle,
  );
  if (state.status === "success") {
    return (
      <Alert>
        <CircleCheckIcon />
        <AlertTitle>&gt; STATUS: 200_OK — Request received.</AlertTitle>
        <AlertDescription>
          Our team will reach out via the email/WhatsApp you provided within 1–2
          business days.
        </AlertDescription>
      </Alert>
    );
  }
  const errors = state.status === "error" ? state.errors : {};
  const values: Partial<FormValues> =
    state.status === "error" ? state.values : {};
  const capabilitySlug = values.capability ?? defaults.capability?.slug;
  return (
    <Card>
      <CardContent>
        <form action={formAction} noValidate>
          <FieldGroup>
            {state.status === "error" && state.message && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Request not sent</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <div aria-hidden className="absolute left-[-9999px]">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-name">Full name</FieldLabel>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  defaultValue={values.name}
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-company">Company</FieldLabel>
                <Input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  defaultValue={values.company}
                  aria-invalid={Boolean(errors.company)}
                  required
                />
                {errors.company && <FieldError>{errors.company}</FieldError>}
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={values.email}
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-phone">
                  WhatsApp number (optional)
                </FieldLabel>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  defaultValue={values.phone}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <FieldError>{errors.phone}</FieldError>}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="contact-topic">I want to</FieldLabel>
              <NativeSelect
                id="contact-topic"
                name="topic"
                defaultValue={values.topic ?? defaults.topic}
                aria-invalid={Boolean(errors.topic)}
                className="w-full"
              >
                {topics.map((t) => (
                  <NativeSelectOption key={t.value} value={t.value}>
                    {t.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.topic && <FieldError>{errors.topic}</FieldError>}
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-sector">
                  Your sector (optional)
                </FieldLabel>
                <NativeSelect
                  id="contact-sector"
                  name="sector"
                  defaultValue={values.sector ?? defaults.sector}
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Select a sector
                  </NativeSelectOption>
                  {sectorOptions.map((o) => (
                    <NativeSelectOption key={o.value} value={o.value}>
                      {o.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-cameras">
                  Number of cameras (optional)
                </FieldLabel>
                <NativeSelect
                  id="contact-cameras"
                  name="cameras"
                  defaultValue={values.cameras ?? ""}
                  className="w-full"
                >
                  <NativeSelectOption value="">
                    Select a range
                  </NativeSelectOption>
                  {cameraOptions.map((o) => (
                    <NativeSelectOption key={o} value={o}>
                      {o}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            {defaults.capability && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Interested in</span>
                <Badge variant="secondary">{defaults.capability.name}</Badge>
                <input type="hidden" name="capability" value={capabilitySlug} />
              </div>
            )}
            <Field>
              <FieldLabel htmlFor="contact-message">
                Message (optional)
              </FieldLabel>
              <Textarea
                id="contact-message"
                name="message"
                defaultValue={values.message}
                placeholder="Tell us about your site and what you want to detect."
              />
            </Field>
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? "SENDING…" : "SEND_REQUEST"}
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <p className="text-muted-foreground">
              We will use your details to reply to this request.
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
