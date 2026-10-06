import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "SAMTEK — AI vision infrastructure for your CCTV",
    template: "%s — SAMTEK",
  },
  description:
    "SAMTEK runs computer vision at the edge, on cameras you already own. Face, vehicle, PPE, and behavior detection — processed locally.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full",
        "antialiased",
        geistSans.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
