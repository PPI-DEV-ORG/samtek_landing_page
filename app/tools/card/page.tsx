import type { Metadata } from "next";
import {
  BusinessCardBack,
  BusinessCardFront,
} from "@/components/tools/business-card";
import { PageBackground } from "@/components/page-background";
import { team } from "@/content/about";

export const metadata: Metadata = {
  title: "Business card",
  robots: { index: false },
};

export default function CardPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16">
      <PageBackground />
      <div className="grid w-full max-w-4xl justify-items-center gap-8 md:grid-cols-2">
        <BusinessCardFront member={team[0]} />
        <BusinessCardBack />
      </div>
    </main>
  );
}
