import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/site/consultation-button";
import { Container } from "@/components/site/container";
import { HeroImage } from "@/components/site/hero-image";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const { image } = siteConfig.hero;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      // bg-navy-deep is the safety net: if the photo is slow or fails to load,
      // the white text still sits on a dark background.
      className="on-dark relative isolate flex min-h-144 items-center overflow-hidden bg-navy-deep text-white sm:min-h-168 lg:min-h-[min(48rem,100svh)]"
    >
      <HeroImage
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center] sm:object-center"
      />

      {/* Flat black overlays on mobile and larger screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/50"
      />
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-black/40"
      /> */}

      <Container className="relative py-32 sm:py-36 lg:py-40">
        <div className="max-w-3xl">
          <p className="animate-rise text-xs font-semibold tracking-[0.22em] text-teal-light uppercase sm:text-[0.8rem]">
            Accounting · Tax · Advisory
          </p>

          <h1
            id="hero-heading"
            className="animate-rise mt-5 font-heading text-[2.5rem] leading-[1.08] font-medium tracking-tight text-white [animation-delay:90ms] sm:text-6xl lg:text-[4.25rem]"
          >
            <span className="block">Clearer Finances.</span>
            <span className="block">Smarter Tax Decisions.</span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/85 [animation-delay:180ms] sm:text-xl">
            From personal tax returns to business bookkeeping and international
            tax consultancy, Rexsis Consultancy helps you manage your financial
            responsibilities with clarity and confidence.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:270ms] sm:flex-row">
            <ConsultationButton variant="light" size="lg" className="sm:min-w-56" />
            <Button
              asChild
              variant="outline-light"
              size="lg"
              className="sm:min-w-56"
            >
              <a href="#services">Explore Our Services</a>
            </Button>
          </div>

          <p className="animate-rise mt-10 flex items-center gap-3 text-sm text-white/75 [animation-delay:360ms]">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-teal-light/80" />
            Professional support for individuals and businesses with Canadian,
            US, and UAE tax needs.
          </p>
        </div>
      </Container>

      <a
        href="#services"
        aria-label="Scroll to our services"
        className="absolute bottom-6 left-1/2 hidden size-10 -translate-x-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white sm:flex"
      >
        <ChevronDown aria-hidden="true" className="animate-nudge size-6" />
      </a>
    </section>
  );
}
