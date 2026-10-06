import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BboxTool } from "@/components/tools/bbox-tool";

export const metadata: Metadata = {
  title: "BBox helper",
  robots: { index: false },
};

export default function BboxPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <BboxTool />;
}
