import {
  cameraOptions,
  isTopic,
  sectorOptions,
  type FormField,
  type FormValues,
  type Topic,
} from "./lead-options";

export type Lead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: Topic;
  sector: string;
  cameras: string;
  capability: string;
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s\-()]{5,24}$/;
const text = (formData: FormData, key: string, max = 200) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

export function parseLead(formData: FormData):
  | { ok: true; lead: Lead; spam: boolean }
  | {
      ok: false;
      errors: Partial<Record<FormField, string>>;
      values: FormValues;
    } {
  const values: FormValues = {
    name: text(formData, "name"),
    company: text(formData, "company"),
    email: text(formData, "email", 254),
    phone: text(formData, "phone", 30),
    topic: text(formData, "topic", 20),
    sector: text(formData, "sector", 40),
    cameras: text(formData, "cameras", 20),
    capability: text(formData, "capability", 80),
    message: text(formData, "message", 4000),
  };
  const errors: Partial<Record<FormField, string>> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (values.company.length < 2) errors.company = "Please enter your company.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email.";
  if (values.phone && !PHONE.test(values.phone))
    errors.phone = "Please enter a valid phone or WhatsApp number.";
  if (!isTopic(values.topic)) errors.topic = "Please choose a topic.";
  if (Object.keys(errors).length > 0) return { ok: false, errors, values };
  return {
    ok: true,
    spam: text(formData, "website") !== "",
    lead: {
      ...values,
      topic: values.topic as Topic,
      sector: sectorOptions.some((s) => s.value === values.sector)
        ? values.sector
        : "",
      cameras: (cameraOptions as readonly string[]).includes(values.cameras)
        ? values.cameras
        : "",
      capability: /^[a-z0-9-]+$/.test(values.capability)
        ? values.capability
        : "",
    },
  };
}

export async function deliverLead(lead: Lead) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Lead delivery is not configured yet.");
  }
  console.info("[lead]", lead);
}
