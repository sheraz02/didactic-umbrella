import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-y bg-sand py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="A Simple Process"
            titleId="how-it-works-heading"
            title="From Questions to Clarity in Three Steps"
            description="Getting professional accounting and tax support should feel straightforward."
          />
        </Reveal>

        <ol className="mt-14 md:mt-16 md:grid md:grid-cols-3 md:gap-10">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;

            return (
              <li
                key={step.title}
                className="relative pb-10 pl-[4.5rem] last:pb-0 md:pb-0 md:pl-0"
              >
                {/* Mobile: vertical line joining this step to the next. */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-14 bottom-0 left-6 w-px bg-teal/30 md:hidden"
                  />
                )}

                <Reveal delay={index * 110}>
                  {/* Mobile: icon sits in the left gutter. Desktop: icon starts
                      a horizontal rule that runs to the next step. */}
                  <div className="absolute top-0 left-0 md:static md:mb-7 md:flex md:items-center md:gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-card text-teal-deep shadow-xs">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-teal/30 md:block"
                      />
                    )}
                  </div>

                  <p className="text-xs font-semibold tracking-[0.2em] text-teal uppercase">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-medium tracking-tight text-navy sm:text-[1.4rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
