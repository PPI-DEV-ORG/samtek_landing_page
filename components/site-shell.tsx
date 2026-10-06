import { PageBackground } from "@/components/page-background";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-x-clip">
      <PageBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
