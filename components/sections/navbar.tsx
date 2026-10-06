import Link from "next/link";
import { MobileMenu } from "@/components/sections/mobile-menu";
import { NavLinks } from "@/components/sections/nav-links";
import { NavShell } from "@/components/sections/nav-shell";
import { SamtekLogo } from "@/components/samtek-logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/capabilities", label: "./capabilities" },
  { href: "/custom-models", label: "./custom-ai" },
  { href: "/sectors", label: "./sectors" },
  { href: "/about", label: "./about" },
  { href: "/download", label: "./download" },
];

export function Navbar() {
  return (
    <NavShell>
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="SAMTEK home">
          <SamtekLogo className="text-xl" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden items-center md:flex">
            <NavLinks links={navLinks} />
          </div>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/contact" />}
            className="border-primary text-primary"
          >
            REQUEST_DEMO()
          </Button>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </NavShell>
  );
}
