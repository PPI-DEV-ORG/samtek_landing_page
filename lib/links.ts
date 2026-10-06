import type { Topic } from "@/lib/lead-options";

export function contactHref(params?: {
  topic?: Topic;
  capability?: string;
  sector?: string;
}) {
  const query = new URLSearchParams();
  if (params?.topic) query.set("topic", params.topic);
  if (params?.capability) query.set("capability", params.capability);
  if (params?.sector) query.set("sector", params.sector);
  const qs = query.toString();
  return qs ? `/contact?${qs}` : "/contact";
}
