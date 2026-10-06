import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityDetail } from "@/components/capabilities/capability-detail";
import { capabilities, capabilityBySlug } from "@/content/capabilities";

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = capabilityBySlug(slug);
  if (!capability) return {};
  return {
    title: capability.name,
    description: capability.oneLiner,
    robots: { index: false, follow: false },
  };
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = capabilityBySlug(slug);
  if (!capability) notFound();
  return <CapabilityDetail capability={capability} />;
}
