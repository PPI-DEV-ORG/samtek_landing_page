"use client";
import Image from "next/image";
import * as React from "react";
import { LayoutDashboardIcon, PlayIcon } from "lucide-react";
import {
  BrowserFrame,
  BrowserTab,
  BrowserTabList,
} from "@/components/browser-frame";
import { SectionHeader } from "@/components/section-header";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const mediaClass = "block aspect-[1600/1000] w-full bg-background object-cover";

function DashboardVideo({ src, poster }: { src: string; poster: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Screen recording of the SAMTEK dashboard"
      className={mediaClass}
    />
  );
}

export function ProductTour() {
  return (
    <section id="product" className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionHeader
          eyebrow="PRODUCT_TOUR.play()"
          title="See it in action."
          description="Every detection, counted and summarized on your own dashboard. Running on-premise, inside your network."
        />
        <Tabs defaultValue="video" className="gap-0">
          <BrowserFrame
            url="localhost/dashboard"
            tabs={
              <BrowserTabList aria-label="Dashboard preview">
                <BrowserTab value="video">
                  <PlayIcon />
                  Live recording
                </BrowserTab>
                <BrowserTab value="screenshot">
                  <LayoutDashboardIcon />
                  Dashboard
                </BrowserTab>
              </BrowserTabList>
            }
          >
            <TabsContent value="video">
              <DashboardVideo
                src="/videos/dashboard-web.mp4"
                poster="/images/product/dashboard.png"
              />
            </TabsContent>
            <TabsContent value="screenshot">
              <Image
                src="/images/product/dashboard.png"
                alt="SAMTEK dashboard: reports summary and object detection counts"
                width={1600}
                height={1000}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className={mediaClass}
              />
            </TabsContent>
          </BrowserFrame>
        </Tabs>
      </div>
    </section>
  );
}
