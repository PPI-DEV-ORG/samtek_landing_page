"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  MailIcon,
  MenuIcon,
  MessageCircleIcon,
} from "lucide-react";
import { SamtekLogo } from "@/components/samtek-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="outline" size="icon" className="md:hidden" />}
        aria-label="Open menu"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="border-b">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SamtekLogo className="text-xl" />
        </SheetHeader>
        <div className="flex flex-col p-2">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <SheetClose
                key={link.href}
                nativeButton={false}
                render={
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-l-2 px-3 py-4 text-sm ${
                      active
                        ? "border-l-primary text-primary"
                        : "border-l-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  />
                }
              >
                {link.label}
                <ChevronRightIcon className="size-4" />
              </SheetClose>
            );
          })}
        </div>
        <SheetFooter className="border-t">
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/contact"
                className={buttonVariants({ size: "lg" })}
              />
            }
          >
            REQUEST_DEMO
            <ArrowRightIcon data-icon="inline-end" />
          </SheetClose>
          <div className="flex flex-col gap-2 pt-2 text-muted-foreground">
            <a
              href="mailto:contact@samtek.id"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MailIcon className="size-4" />
              contact@samtek.id
            </a>
            <a
              href="https://wa.me/6287744488999"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MessageCircleIcon className="size-4" />
              087744488999
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
