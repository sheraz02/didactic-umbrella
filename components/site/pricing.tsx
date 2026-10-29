import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConsultationButton } from "@/components/site/consultation-button";
import { Container } from "@/components/site/container";
import { InquiryLink } from "@/components/site/inquiry-link";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { pricingPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Transparent Pricing"
            titleId="pricing-heading"
            title="The Right Support for Your Needs"
            description="Every financial situation is different. Choose the type of support you need, and we will help you understand the appropriate scope and cost."
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <li key={plan.id} className="flex">
              <Reveal delay={index * 90} className="flex w-full">
                <Card
                  className={cn(
                    "w-full gap-0 p-7 sm:p-8",
                    plan.featured &&
                      "on-dark border-navy bg-navy text-white shadow-lg shadow-navy/15",
                  )}
                >
                  <h3
                    className={cn(
                      "font-heading text-2xl font-medium tracking-tight",
                      plan.featured ? "text-white" : "text-navy",
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-[0.95rem] leading-relaxed",
                      plan.featured ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {plan.description}
                  </p>

                  <div
                    className={cn(
                      "mt-6 border-y py-5",
                      plan.featured ? "border-white/15" : "border-border",
                    )}
                  >
                    <p
                      className={cn(
                        "font-heading text-3xl font-medium tracking-tight",
                        plan.featured ? "text-white" : "text-navy",
                      )}
                    >
                      {plan.priceLabel}
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 text-sm",
                        plan.featured ? "text-white/70" : "text-muted-foreground",
                      )}
                    >
                      {plan.priceNote}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.featured ? "text-teal-light" : "text-teal",
                          )}
                        />
                        <span className={plan.featured ? "text-white/90" : "text-foreground"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    {plan.featuredNote && (
                      <p className="mb-4 text-sm text-teal-light">{plan.featuredNote}</p>
                    )}
                    {plan.action === "consultation" ? (
                      <ConsultationButton
                        variant={plan.featured ? "light" : "outline"}
                        size="lg"
                        service={plan.service}
                        className="w-full"
                      >
                        {plan.cta}
                      </ConsultationButton>
                    ) : (
                      <Button
                        asChild
                        variant={plan.featured ? "light" : "outline"}
                        size="lg"
                        className="w-full"
                      >
                        <InquiryLink service={plan.service}>{plan.cta}</InquiryLink>
                      </Button>
                    )}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-md border bg-card/70 px-5 py-4 text-sm leading-relaxed text-pretty text-muted-foreground">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
            <span>
              Final pricing depends on the service, complexity, and requirements.
              We outline the scope and expected cost with you before work begins.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
