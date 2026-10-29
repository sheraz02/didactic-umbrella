import Link from "next/link";
import { cacheLife } from "next/cache";

import { BrandMark } from "@/components/site/brand-mark";
import { Container } from "@/components/site/container";
import { InquiryLink } from "@/components/site/inquiry-link";
import { footerServiceLinks, navLinks } from "@/lib/content";
import { getConsultationLink, siteConfig } from "@/lib/site-config";

/**
 * Current year, computed once and cached. With Cache Components, reading the
 * clock in a static page must be explicit; caching it keeps the page static and
 * still rolls over to the new year within a day.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const linkClass =
  "rounded-sm text-sm text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline";

const headingClass =
  "text-xs font-semibold tracking-[0.2em] text-teal-light uppercase";

function LegalLink({
  href,
  children,
}: {
  href: string | null;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  // The page has not been supplied yet — show it as text, never as a dead link.
  return (
    <span className="text-sm text-white/50">
      {children} <span className="text-xs">(coming soon)</span>
    </span>
  );
}

export function Footer() {
  const { email, location } = siteConfig.contact;
  const consultation = getConsultationLink();

  return (
    <footer className="on-dark border-t border-white/10 bg-navy-deep text-white">
      <Container className="pt-14 pb-10 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <a
              href="#home"
              aria-label="Rexsis Consultancy — back to top"
              className="inline-block rounded-md"
            >
              <BrandMark tone="light" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Accounting, tax, bookkeeping, and consultancy support for
              individuals and businesses.
            </p>
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className={headingClass}>
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((item) => (
                <li key={item.label}>
                  <InquiryLink service={item.service} className={linkClass}>
                    {item.label}
                  </InquiryLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className={headingClass}>
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h2 id="footer-contact" className={headingClass}>
              Get in Touch
            </h2>
            <ul aria-labelledby="footer-contact" className="mt-5 space-y-3">
              <li>
                <InquiryLink
                  href={consultation.href}
                  external={consultation.external}
                  className={linkClass}
                >
                  Book a Consultation
                </InquiryLink>
              </li>
              <li>
                {email ? (
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                ) : (
                  <span className="text-sm text-white/50">Email details coming soon</span>
                )}
              </li>
              {location && (
                <li className="text-sm text-white/75">{location}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-white/60">
            Tax outcomes and filing requirements depend on individual
            circumstances and applicable law. Information on this website is
            general in nature.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/70">
              © <CurrentYear /> {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <LegalLink href={siteConfig.legal.privacyPolicyHref}>
                  Privacy Policy
                </LegalLink>
              </li>
              <li>
                <LegalLink href={siteConfig.legal.termsHref}>
                  Terms &amp; Conditions
                </LegalLink>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
