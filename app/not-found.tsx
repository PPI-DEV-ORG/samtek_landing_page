import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { StaticVideo } from "@/components/static-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Page not found" };

const quickLinks = [
  { href: "/capabilities", label: "CAPABILITIES" },
  { href: "/sectors", label: "SECTORS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function NotFound() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="ERROR / 404"
        title={
          <>
            Page <span className="text-primary">not found</span>.
          </>
        }
        description="The page you are looking for does not exist, or it has moved. Try one of the pages below, or head back to the start."
        actions={
          <>
            <Button size="lg" nativeButton={false} render={<Link href="/" />}>
              BACK_HOME
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/capabilities" />}
            >
              VIEW_CAPABILITIES
            </Button>
          </>
        }
        visual={
          <Card className="self-center">
            <CardHeader>
              <CardTitle>CAM_404 · UNKNOWN_LOCATION</CardTitle>
              <CardAction>
                <Badge variant="destructive" className="animate-pulse">
                  OFFLINE
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-muted">
                <StaticVideo
                  src="/videos/static-lite.mp4"
                  className="absolute inset-0 size-full object-cover opacity-70 motion-reduce:hidden"
                />
                <div className="relative flex flex-col items-center gap-3 bg-background/85 px-8 py-4">
                  <span className="text-6xl font-extrabold md:text-8xl">
                    404
                  </span>
                  <Badge variant="destructive">NO SIGNAL</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between text-muted-foreground">
              <span>STATUS: NO_SIGNAL</span>
              <span>EDGE-NODE-01 · ON-PREM</span>
            </CardFooter>
          </Card>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground">Popular</span>
          {quickLinks.map((l) => (
            <Badge
              key={l.href}
              variant="outline"
              render={<Link href={l.href} />}
            >
              {l.label}
            </Badge>
          ))}
        </div>
      </PageHero>
    </SiteShell>
  );
}
