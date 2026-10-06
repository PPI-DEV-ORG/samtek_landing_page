import { Capabilities } from "@/components/sections/capabilities";
import { Compare } from "@/components/sections/compare";
import { Compatibility } from "@/components/sections/compatibility";
import { Demo } from "@/components/sections/demo";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductTour } from "@/components/sections/product-tour";
import { Sectors } from "@/components/sections/sectors";
import { Security } from "@/components/sections/security";
import { Trust } from "@/components/sections/trust";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <HowItWorks />
      <ProductTour />
      <Compare />
      <Sectors />
      <Compatibility />
      <Security />
      <Trust />
      <Faq />
      <Demo />
    </>
  );
}
