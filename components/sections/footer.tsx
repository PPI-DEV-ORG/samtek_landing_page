import Link from "next/link";
import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import { SamtekLogo } from "@/components/samtek-logo";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { capabilities } from "@/content/capabilities";
import { sectors } from "@/content/sectors";

const linkClass = "text-muted-foreground transition-colors hover:text-primary";
const headingClass = "text-foreground font-bold";

const featuredCapabilities = capabilities.filter((c) => c.tier === "featured");

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/custom-models", label: "Custom AI" },
  { href: "/security", label: "Security" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="px-6 pt-14 pb-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="SAMTEK home" className="w-fit">
              <SamtekLogo className="text-xl" />
            </Link>
            <p className="max-w-xs text-muted-foreground">
              AI vision infrastructure for the CCTV you already own. Processed
              at the edge, data never leaving your network.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">ON-PREM</Badge>
              <Badge variant="outline">EDGE-FIRST</Badge>
              <Badge variant="outline">ZERO CLOUD</Badge>
            </div>
          </div>

          <nav aria-label="Capabilities" className="flex flex-col gap-3">
            <span className={headingClass}>CAPABILITIES</span>
            {featuredCapabilities.map((c) => (
              <Link
                key={c.slug}
                href={`/capabilities/${c.slug}`}
                className={linkClass}
              >
                {c.name}
              </Link>
            ))}
            <Link href="/capabilities" className="text-primary hover:text-secondary">
              View all →
            </Link>
          </nav>

          <nav aria-label="Sectors" className="flex flex-col gap-3">
            <span className={headingClass}>SECTORS</span>
            {sectors.map((s) => (
              <Link key={s.slug} href={`/sectors/${s.slug}`} className={linkClass}>
                {s.name}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-3">
            <span className={headingClass}>COMPANY</span>
            {companyLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>CONTACT</span>
            <a
              href="mailto:contact@samtek.id"
              className={`${linkClass} flex items-center gap-2`}
            >
              <MailIcon className="size-4 shrink-0" />
              contact@samtek.id
            </a>
            <a
              href="https://wa.me/6287744488999"
              className={`${linkClass} flex items-center gap-2`}
            >
              <MessageCircleIcon className="size-4 shrink-0" />
              087744488999
            </a>
            <address className="flex items-start gap-2 text-muted-foreground not-italic">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" />
              <span>
                Jl. Bintara Jaya VIII, RT.008/RW.009, Bintara Jaya, Kec. Bekasi
                Barat, Jawa Barat 17136
              </span>
            </address>
          </div>
        </div>

        <svg
          aria-hidden
          viewBox="0 0 360 74"
          className="mx-auto mt-14 h-auto w-full max-w-6xl font-extrabold select-none"
        >
          <text
            x="0"
            y="72"
            fontSize="100"
            textLength="360"
            lengthAdjust="spacingAndGlyphs"
            className="fill-foreground/[0.05]"
          >
            SAMTEK
          </text>
        </svg>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-5">
          <Separator />
          <div className="flex flex-col justify-between gap-3 text-muted-foreground sm:flex-row sm:items-center">
            <p>© 2026 PT Safanah Alvan Maksima. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              SYSTEM: ONLINE · 24/7 EDGE INFERENCE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
