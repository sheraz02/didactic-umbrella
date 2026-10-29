import { ArrowRight, Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { InquiryLink } from "@/components/site/inquiry-link";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            titleId="services-heading"
            title="Financial Expertise for Every Stage of Business"
            description="Practical tax, bookkeeping, and consultancy services designed around your financial needs."
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={service.id} className={cn("flex", service.layout)}>
                <Reveal delay={(index % 3) * 80} className="flex w-full">
                  <Card className="group relative w-full gap-0 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md motion-reduce:hover:translate-y-0 sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-md bg-teal-tint text-teal-deep">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <h3 className="mt-5 font-heading text-xl font-medium tracking-tight text-navy sm:text-[1.4rem]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-5 mb-6 space-y-2 border-t pt-5">
                      {service.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-teal"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* The stretched link makes the whole card clickable while
                        keeping a single, clearly labelled tab stop. */}
                    <InquiryLink
                      service={service.service}
                      className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-teal-deep underline-offset-4 after:absolute after:inset-0 after:rounded-lg group-hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {service.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </InquiryLink>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
