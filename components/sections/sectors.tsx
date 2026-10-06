import { SectionHeader } from "@/components/section-header";
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

const sectors = [
  {
    num: "01",
    slug: "retail",
    name: "Retail",
    image: "/images/sectors/retail.jpg",
    imageAlt:
      "Supermarket aisles and checkout as seen by a ceiling security camera",
    desc: "Turns store cameras into visitor analytics and loss-prevention tools.",
    usecases: [
      "People Counting",
      "Heatmap & Dwell Time",
      "Queue Length Monitoring",
      "Face Recognition (Blacklist)",
    ],
  },
  {
    num: "02",
    slug: "manufacturing",
    name: "Manufacturing & Industry",
    image: "/images/sectors/manufacturing.jpg",
    imageAlt:
      "Production line workers in a factory hall seen from a high security camera",
    desc: "Keeps workplace safety compliance and production-line productivity automated.",
    usecases: [
      "PPE Detection",
      "Intrusion Detection",
      "Fire & Smoke Detection",
      "Idle Worker Detection",
    ],
  },
  {
    num: "03",
    slug: "banking",
    name: "Banking & Finance",
    image: "/images/sectors/banking.jpg",
    imageAlt:
      "Bank branch lobby with teller counters seen from a security camera",
    desc: "Strengthens branch security and detects threats before they become incidents.",
    usecases: [
      "Face Recognition (VIP/Blacklist)",
      "Weapon Detection",
      "Anti-Passback / Tailgating",
      "Queue Length Monitoring",
    ],
  },
  {
    num: "04",
    slug: "government-smart-city",
    name: "Government & Smart City",
    image: "/images/sectors/smart-city.jpg",
    imageAlt:
      "City intersection with traffic and pedestrians seen from a pole-mounted camera",
    desc: "Supports large-scale public-space and city traffic surveillance.",
    usecases: [
      "License Plate Recognition",
      "Traffic Congestion Analytics",
      "Crowd Counting & Density",
      "Perimeter Breach Alert",
    ],
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="SOLUTION_SECTORS.select()"
          title="Four sectors, one platform."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <Link
              key={sector.num}
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
                  <CardDescription>{sector.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-3">
                  <Separator />
                  <ul className="flex flex-col gap-2">
                    {sector.usecases.map((uc) => (
                      <li key={uc} className="flex gap-2">
                        <span className="text-primary">‣</span>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
