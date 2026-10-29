import { CalendarCheck, Lock, Mail, MapPin, type LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { siteConfig } from "@/lib/site-config";

interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

const linkClass =
  "font-medium text-teal-deep underline underline-offset-4 hover:text-navy";

export function Contact() {
  const { email, bookingUrl, location } = siteConfig.contact;

  // Missing details fall back to neutral wording — nothing is invented.
  const details: ContactDetail[] = [
    {
      icon: Mail,
      label: "Business email",
      value: email ? (
        <a href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      ) : (
        <span className="text-muted-foreground">Email details coming soon</span>
      ),
    },
    {
      icon: CalendarCheck,
      label: "Consultation booking",
      value: bookingUrl ? (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Schedule a consultation
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <span>Request a consultation using the form</span>
      ),
    },
    {
      icon: MapPin,
      label: location ? "Location" : "Service coverage",
      value:
        location ??
        "Canadian, US, and UAE tax matters, plus bookkeeping and consultancy",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t bg-sand py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Let’s Talk"
              titleId="contact-heading"
              title="Let’s Make Your Next Financial Decision Clearer."
              description="Tell us what you need help with, and we will take the next step together."
            />

            <ul className="mt-10 space-y-6">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-card text-teal-deep shadow-xs ring-1 ring-border">
                    <Icon aria-hidden="true" className="size-[1.15rem]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-foreground">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 flex items-start gap-3 border-t pt-6 text-sm leading-relaxed text-muted-foreground">
              <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>
                Please do not send passwords, banking credentials, or unnecessary
                sensitive personal information through this form.
              </span>
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="relative rounded-lg border bg-card p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
