import { Contact } from "@/components/site/contact";
import { CtaSection } from "@/components/site/cta-section";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { Navbar } from "@/components/site/navbar";
import { Pricing } from "@/components/site/pricing";
import { Services } from "@/components/site/services";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <Contact />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
