/**
 * Inquiry form: shared types, validation, and the client-side submit helper.
 *
 * `validateInquiry` runs in the browser (instant feedback) and again on the
 * server in app/api/inquiry/route.ts, so the rules live in exactly one place.
 */

export const serviceOptions = [
  { value: "canada-t1", label: "Canadian Tax — T1 Individual" },
  { value: "canada-t2", label: "Canadian Tax — T2 Corporate" },
  { value: "bookkeeping", label: "Bookkeeping" },
  { value: "tax-consultancy", label: "Tax Consultancy" },
  { value: "usa-tax", label: "USA Tax" },
  { value: "uae-tax", label: "UAE Tax" },
  { value: "other", label: "Other" },
] as const;

export type ServiceValue = (typeof serviceOptions)[number]["value"];

export function isServiceValue(value: unknown): value is ServiceValue {
  return serviceOptions.some((option) => option.value === value);
}

/** Dispatched on `window` by buttons that should pre-select a service. */
export const SELECT_SERVICE_EVENT = "rexsis:select-service";

export interface InquiryValues {
  name: string;
  email: string;
  country: string;
  service: ServiceValue | "";
  message: string;
  /** Honeypot — real visitors never see or fill this. */
  website: string;
}

export type InquiryField = Exclude<keyof InquiryValues, "website">;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

/** Field order, used to focus the first invalid field. */
export const inquiryFieldOrder: InquiryField[] = [
  "name",
  "email",
  "country",
  "service",
  "message",
];

export const emptyInquiry: InquiryValues = {
  name: "",
  email: "",
  country: "",
  service: "",
  message: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = { name: 100, email: 254, country: 80, message: 5000 } as const;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter your full name.";
  else if (name.length > MAX.name)
    errors.name = `Please keep your name under ${MAX.name} characters.`;

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > MAX.email || !EMAIL_PATTERN.test(email))
    errors.email = "Enter a valid email address, such as name@example.com.";

  const country = values.country.trim();
  if (!country) errors.country = "Please tell us your country or jurisdiction.";
  else if (country.length > MAX.country)
    errors.country = `Please keep this under ${MAX.country} characters.`;

  if (!values.service) errors.service = "Please choose a service of interest.";
  else if (!isServiceValue(values.service))
    errors.service = "Please choose one of the listed services.";

  const message = values.message.trim();
  if (!message) errors.message = "Please tell us a little about what you need.";
  else if (message.length < 10)
    errors.message = "Please add a little more detail (at least 10 characters).";
  else if (message.length > MAX.message)
    errors.message = `Please keep your message under ${MAX.message} characters.`;

  return errors;
}

export type SubmitResult =
  /** The server accepted the inquiry. */
  | { status: "success" }
  /** No delivery destination is configured yet — nothing was sent. */
  | { status: "unavailable" }
  /** The server rejected specific fields. */
  | { status: "invalid"; errors: InquiryErrors }
  /** Network or delivery failure — nothing was confirmed as sent. */
  | { status: "error" };

/**
 * Sends the inquiry to our own API route. This is the only function the form
 * calls to submit, so swapping the delivery mechanism never touches the UI.
 * It resolves to "success" only when the server confirms delivery.
 */
export async function submitInquiry(values: InquiryValues): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) return { status: "success" };

    const body: unknown = await response.json().catch(() => null);
    const code =
      body && typeof body === "object" && "code" in body
        ? (body as { code?: unknown }).code
        : undefined;

    if (response.status === 503 && code === "not_configured")
      return { status: "unavailable" };

    if (response.status === 400 && body && typeof body === "object" && "errors" in body)
      return {
        status: "invalid",
        errors: (body as { errors: InquiryErrors }).errors,
      };

    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}
