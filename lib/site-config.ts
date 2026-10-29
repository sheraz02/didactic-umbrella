/**
 * Site configuration — the single place for business details.
 *
 * Anything the firm has not supplied yet is `null` on purpose. The UI shows a
 * neutral fallback for each `null` value and NEVER invents a phone number,
 * email address, office address, booking link, or legal page.
 *
 * To go live, fill in the values marked TODO below.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  /** Canonical production URL (no trailing slash). */
  url: string;
  description: string;
  contact: {
    /** TODO: business email, e.g. "hello@rexsis.com". Shown as a mailto link. */
    email: string | null;
    /**
     * TODO: consultation booking link (Calendly, Cal.com, Microsoft Bookings…).
     * When set, every "Book a Consultation" button opens it in a new tab.
     * When null, those buttons scroll to the inquiry form instead.
     */
    bookingUrl: string | null;
    /** TODO: physical business location. Only fill in once confirmed. */
    location: string | null;
  };
  legal: {
    /** TODO: route or URL of the Privacy Policy page, e.g. "/privacy". */
    privacyPolicyHref: string | null;
    /** TODO: route or URL of the Terms & Conditions page, e.g. "/terms". */
    termsHref: string | null;
  };
  hero: {
    image: {
      /**
       * Remote photo (Unsplash License — free for commercial use). To use your
       * own photograph instead, save it as public/images/hero-business.jpg and
       * set `src` to "/images/hero-business.jpg".
       */
      src: string;
      /** Describe what is actually in the photo. Use "" if it is purely decorative. */
      alt: string;
      credit: { name: string; url: string };
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "Rexsis Consultancy",
  shortName: "Rexsis",
  url: "https://rexsis.com",
  description:
    "Professional tax, bookkeeping, and consultancy support for individuals and businesses, including Canadian T1 and T2 tax services, USA tax, and UAE tax.",
  contact: {
    email: "rexsis@rexsis.com",
    bookingUrl: "https://calendly.com/sheraz-ahmad8814/30min",
    location: null,
  },
  legal: {
    privacyPolicyHref: null,
    termsHref: null,
  },
  hero: {
    image: {
      src: "https://images.unsplash.com/photo-1758876201660-103984519266?fm=jpg&w=2400&auto=format&fit=crop",
      alt: "Professional reviewing documents beside a laptop at an office desk",
      credit: {
        name: "Vitaly Gariev",
        url: "https://unsplash.com/@silverkblack",
      },
    },
  },
};

/** Where "Book a Consultation" buttons should go. */
export function getConsultationLink(): { href: string; external: boolean } {
  const { bookingUrl } = siteConfig.contact;
  return bookingUrl
    ? { href: bookingUrl, external: true }
    : { href: "#contact", external: false };
}
