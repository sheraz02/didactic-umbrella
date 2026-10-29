import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/site/consultation-button";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-dark bg-gradient-to-b from-navy to-navy-deep py-20 text-white sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="cta-heading"
            className="font-heading text-3xl leading-[1.15] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mt-5 max-w-xl text-base text-pretty text-white/80 sm:text-lg">
            Get the clarity you need to move forward with confidence. Let’s
            discuss the right accounting or tax support for you.
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ConsultationButton variant="light" size="lg" className="sm:min-w-56" />
            <Button asChild variant="outline-light" size="lg" className="sm:min-w-56">
              <a href="#contact">Contact Our Team</a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
