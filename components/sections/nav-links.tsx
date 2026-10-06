"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NavLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const active =
          !link.href.includes("#") &&
          (pathname === link.href || pathname.startsWith(`${link.href}/`));
        return (
          <Button
            key={link.href}
            variant="ghost"
            nativeButton={false}
            render={<Link href={link.href} />}
            className={`relative after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200 ${
              active
                ? "text-primary after:scale-x-100"
                : "text-muted-foreground after:scale-x-0 hover:after:scale-x-100"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Button>
        );
      })}
    </>
  );
}
