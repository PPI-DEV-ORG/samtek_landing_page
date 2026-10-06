"use server";
import { company } from "@/content/about";
import type { ContactState } from "@/lib/lead-options";
import { deliverLead, parseLead } from "@/lib/leads";

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = parseLead(formData);
  if (!parsed.ok) {
    return { status: "error", errors: parsed.errors, values: parsed.values };
  }
  if (parsed.spam) return { status: "success" };
  try {
    await deliverLead(parsed.lead);
  } catch {
    return {
      status: "error",
      errors: {},
      values: {
        name: parsed.lead.name,
        company: parsed.lead.company,
        email: parsed.lead.email,
        phone: parsed.lead.phone,
        topic: parsed.lead.topic,
        sector: parsed.lead.sector,
        cameras: parsed.lead.cameras,
        capability: parsed.lead.capability,
        message: parsed.lead.message,
      },
      message: `We could not send your request just now. Please email ${company.email} or message us on WhatsApp.`,
    };
  }
  return { status: "success" };
}
