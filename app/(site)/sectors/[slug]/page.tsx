import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorDetail } from "@/components/sectors/sector-detail";
import { sectorBySlug, sectors } from "@/content/sectors";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  return {
    title: sector.name,
    description: sector.oneLiner,
    robots: { index: false, follow: false },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();
  return <SectorDetail sector={sector} />;
}
