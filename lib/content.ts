import {
  BookOpenCheck,
  Building2,
  CircleCheck,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Landmark,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";

import type { ServiceValue } from "@/lib/inquiry";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "services", label: "Services", href: "#services" },
  { id: "how-it-works", label: "How It Works", href: "#how-it-works" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  cta: string;
  /** Service pre-selected in the inquiry form when the CTA is used. */
  service?: ServiceValue;
  /** Grid placement: 3 cards on the first row, 2 wider cards on the second. */
  layout: string;
}

export const services: Service[] = [
  {
    id: "canadian-tax",
    icon: FileCheck2,
    title: "Canadian Tax Services",
    description:
      "Professional assistance with Canadian tax filing and compliance for individuals and businesses.",
    highlights: ["T1 Individual Tax Returns", "T2 Corporate Tax Returns"],
    cta: "Explore Canadian Tax Services",
    layout: "lg:col-span-2",
  },
  {
    id: "bookkeeping",
    icon: BookOpenCheck,
    title: "Bookkeeping Services",
    description:
      "Keep financial records organized with structured bookkeeping support that helps you understand your business finances.",
    highlights: [
      "Transaction categorization",
      "Account reconciliation",
      "Organized financial records",
    ],
    cta: "Explore Bookkeeping",
    service: "bookkeeping",
    layout: "lg:col-span-2",
  },
  {
    id: "tax-consultancy",
    icon: Compass,
    title: "Tax Consultancy",
    description:
      "Get practical guidance to better understand tax responsibilities, evaluate your options, and make informed financial decisions.",
    highlights: [
      "Tax planning",
      "Tax consultancy and guidance",
      "Review of your options",
    ],
    cta: "Explore Tax Consultancy",
    service: "tax-consultancy",
    layout: "lg:col-span-2",
  },
  {
    id: "usa-tax",
    icon: Landmark,
    title: "USA Tax Services",
    description:
      "Tax preparation and consultancy support for eligible individuals and businesses with US tax responsibilities.",
    highlights: ["Tax preparation support", "Consultancy on US tax responsibilities"],
    cta: "Explore USA Tax Services",
    service: "usa-tax",
    layout: "lg:col-span-3",
  },
  {
    id: "uae-tax",
    icon: Building2,
    title: "UAE Tax Services",
    description:
      "Tax and accounting support for businesses navigating applicable UAE tax requirements.",
    highlights: ["Tax and accounting support", "Guidance on applicable UAE tax requirements"],
    cta: "Explore UAE Tax Services",
    service: "uae-tax",
    // On tablets (2 columns) the fifth card spans the full row.
    layout: "md:col-span-2 lg:col-span-3",
  },
];

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    icon: MessageSquareText,
    title: "Tell Us About Your Needs",
    description:
      "Share your requirements, whether you need help with an individual tax return, corporate filings, ongoing bookkeeping, or tax consultancy.",
  },
  {
    icon: ClipboardCheck,
    title: "Get a Tailored Approach",
    description:
      "We discuss your circumstances, identify the relevant services, and outline the next steps and expected costs.",
  },
  {
    icon: CircleCheck,
    title: "Move Forward with Confidence",
    description:
      "Receive support with the agreed services and a clearer understanding of your financial responsibilities.",
  },
];

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  /** No prices have been supplied — every plan is quoted on request. */
  priceLabel: string;
  priceNote: string;
  features: string[];
  cta: string;
  service: ServiceValue;
  /** "consultation" uses the booking link when one is configured. */
  action: "inquiry" | "consultation";
  featured?: boolean;
  featuredNote?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "individual-tax",
    name: "Individual Tax",
    description: "For individuals who need assistance with personal tax filing.",
    priceLabel: "Custom Quote",
    priceNote: "Pricing based on scope — depends on your return and documents.",
    features: [
      "T1 individual tax return assistance",
      "Document review",
      "Guidance on applicable filing requirements",
    ],
    cta: "Get a Tax Quote",
    service: "canada-t1",
    action: "inquiry",
  },
  {
    id: "business-accounting",
    name: "Business Accounting",
    description:
      "For businesses that need help keeping their financial records organized.",
    priceLabel: "Custom Quote",
    priceNote: "Pricing based on scope — depends on your accounts and activity.",
    features: [
      "Bookkeeping support",
      "Financial record organization",
      "Reconciliation support, where included in the agreed scope",
    ],
    cta: "Discuss My Business",
    service: "bookkeeping",
    action: "inquiry",
  },
  {
    id: "tax-advisory",
    name: "Tax Advisory",
    description:
      "For individuals or businesses seeking tax consultancy and guidance.",
    priceLabel: "Custom Quote",
    priceNote: "Pricing based on scope — depends on your questions and requirements.",
    features: [
      "Discussion of tax requirements",
      "Service-specific guidance",
      "A tailored scope of work",
    ],
    cta: "Book a Consultation",
    service: "tax-consultancy",
    action: "consultation",
    featured: true,
    featuredNote: "A good starting point if you are not sure what you need.",
  },
];

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export interface FooterServiceLink {
  label: string;
  service?: ServiceValue;
}

export const footerServiceLinks: FooterServiceLink[] = [
  { label: "Canadian Tax Services" },
  { label: "T1 Individual Tax", service: "canada-t1" },
  { label: "T2 Corporate Tax", service: "canada-t2" },
  { label: "Bookkeeping", service: "bookkeeping" },
  { label: "Tax Consultancy", service: "tax-consultancy" },
  { label: "USA Tax", service: "usa-tax" },
  { label: "UAE Tax", service: "uae-tax" },
];
