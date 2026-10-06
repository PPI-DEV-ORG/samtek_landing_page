import type { Metadata } from "next";
import { LinkedinBanner } from "@/components/tools/linkedin-banner";
import { PageBackground } from "@/components/page-background";

export const metadata: Metadata = {
  title: "LinkedIn banner",
  robots: { index: false },
};

export default async function BannerPage({
  searchParams,
}: PageProps<"/tools/banner">) {
  const { export: exporting } = await searchParams;
  if (exporting !== undefined) {
    return (
      <>
        <style>{`nextjs-portal{display:none!important}[data-slot=card]{border:0}[data-slot=card]::before,[data-slot=card]::after{display:none}`}</style>
        <LinkedinBanner />
      </>
    );
  }
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-16">
      <PageBackground />
      <LinkedinBanner />
    </main>
  );
}
