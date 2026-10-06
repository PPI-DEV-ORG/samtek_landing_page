import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capabilityBySlug } from "@/content/capabilities";
import type { Sector } from "@/content/sectors";

export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/sectors/${sector.slug}`}
      className="group block h-full outline-none"
    >
      <Card className="h-full transition-colors group-hover:border-primary group-focus-visible:border-primary">
        <CardContent>
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            <Image
              src={sector.image}
              alt={sector.imageAlt}
              fill
              sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardHeader>
          <span className="text-secondary">{sector.num}</span>
          <CardTitle className="text-base">{sector.name}</CardTitle>
          <CardDescription>{sector.oneLiner}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col gap-3">
          <Separator />
          <ul className="flex flex-col gap-2">
            {sector.primary.map((slug) => (
              <li key={slug} className="flex gap-2">
                <span className="text-primary">‣</span>
                {capabilityBySlug(slug)?.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
