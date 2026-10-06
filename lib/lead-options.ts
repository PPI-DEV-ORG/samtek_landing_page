export type Topic = (typeof topics)[number]["value"];
export type FormField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "topic"
  | "sector"
  | "cameras"
  | "message"
  | "capability";
export type FormValues = Record<FormField, string>;
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      errors: Partial<Record<FormField, string>>;
      message?: string;
      values: FormValues;
    };

export const topics = [
  { value: "demo", label: "Request a demo" },
  { value: "quote", label: "Request a quote" },
  { value: "trial", label: "Request a trial license" },
  { value: "custom", label: "Custom AI model" },
  { value: "question", label: "General question" },
] as const;
export const isTopic = (v: unknown): v is Topic =>
  topics.some((t) => t.value === v);
export const sectorOptions = [
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing & Industry" },
  { value: "banking", label: "Banking & Finance" },
  { value: "government-smart-city", label: "Government & Smart City" },
  { value: "other", label: "Other" },
] as const;
export const cameraOptions = [
  "1–10",
  "11–50",
  "51–200",
  "200+",
  "Not sure yet",
] as const;
