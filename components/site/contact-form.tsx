"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  SELECT_SERVICE_EVENT,
  emptyInquiry,
  inquiryFieldOrder,
  isServiceValue,
  serviceOptions,
  submitInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryValues,
} from "@/lib/inquiry";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "unavailable" | "error";

const fieldId = (field: InquiryField) => `inquiry-${field}`;

interface FieldProps {
  field: InquiryField;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ field, label, error, hint, children }: FieldProps) {
  const id = fieldId(field);
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-sm text-destructive"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby value for a field: its error if shown, otherwise its hint. */
function describedBy(field: InquiryField, error?: string, hasHint = false) {
  const id = fieldId(field);
  if (error) return `${id}-error`;
  return hasHint ? `${id}-hint` : undefined;
}

export function ContactForm() {
  const [values, setValues] = React.useState<InquiryValues>(emptyInquiry);
  const [errors, setErrors] = React.useState<InquiryErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");

  const isSubmitting = React.useRef(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const { email, bookingUrl } = siteConfig.contact;

  // Buttons elsewhere on the page ("Explore Bookkeeping", pricing CTAs…) can
  // pre-select the service of interest.
  React.useEffect(() => {
    const onSelectService = (event: Event) => {
      const service = (event as CustomEvent<unknown>).detail;
      if (!isServiceValue(service)) return;
      setValues((current) => ({ ...current, service }));
      setErrors((current) => ({ ...current, service: undefined }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelectService);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelectService);
  }, []);

  // Move focus to the result panel so screen-reader users hear the outcome.
  React.useEffect(() => {
    if (status === "success" || status === "unavailable" || status === "error") {
      panelRef.current?.focus();
    }
  }, [status]);

  function setField<K extends keyof InquiryValues>(field: K, value: InquiryValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "website") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function validateEmailOnBlur() {
    if (!values.email.trim()) return;
    const message = validateInquiry(values).email;
    if (message) setErrors((current) => ({ ...current, email: message }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return; // ignore double clicks / repeated Enter

    const found = validateInquiry(values);
    setErrors(found);

    const firstInvalid = inquiryFieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    isSubmitting.current = true;
    setStatus("submitting");

    const result = await submitInquiry(values);

    isSubmitting.current = false;

    switch (result.status) {
      case "success":
        setValues(emptyInquiry);
        setStatus("success");
        break;
      case "invalid":
        setErrors(result.errors);
        setStatus("idle");
        {
          const first = inquiryFieldOrder.find((field) => result.errors[field]);
          if (first) document.getElementById(fieldId(first))?.focus();
        }
        break;
      case "unavailable":
        setStatus("unavailable");
        break;
      default:
        setStatus("error");
    }
  }

  function resetForm() {
    setValues(emptyInquiry);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        ref={panelRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 rounded-md outline-offset-8"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-teal-tint text-teal-deep">
          <CircleCheck aria-hidden="true" className="size-6" />
        </span>
        <h3 className="font-heading text-2xl font-medium tracking-tight text-navy">
          Thank you — your inquiry has been sent.
        </h3>
        <p className="max-w-md text-muted-foreground">
          We will review your details and follow up using the email address you
          provided.
        </p>
        <Button variant="outline" onClick={resetForm}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const fallback = (
    <>
      {email ? (
        <>
          {" "}
          Please email us at{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium underline underline-offset-4"
          >
            {email}
          </a>
          {bookingUrl ? " or " : "."}
        </>
      ) : null}
      {bookingUrl ? (
        <>
          {email ? "" : " Please "}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            book a consultation directly
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </>
      ) : null}
    </>
  );

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={status === "submitting"} className="space-y-5">
      {(status === "unavailable" || status === "error") && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground outline-offset-4"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p>
            <strong className="font-semibold">
              {status === "unavailable"
                ? "Online inquiries are not switched on yet."
                : "Something went wrong."}
            </strong>{" "}
            Your message has not been sent.
            {status === "error" && " Please try again in a moment."}
            {fallback}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field field="name" label="Full name" error={errors.name}>
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name", errors.name)}
          />
        </Field>

        <Field field="email" label="Email address" error={errors.email}>
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            onBlur={validateEmailOnBlur}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email", errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          field="country"
          label="Country or jurisdiction"
          error={errors.country}
        >
          <Input
            id={fieldId("country")}
            name="country"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={(event) => setField("country", event.target.value)}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={describedBy("country", errors.country)}
          />
        </Field>

        <Field field="service" label="Service of interest" error={errors.service}>
          <Select
            name="service"
            value={values.service}
            onValueChange={(value) => {
              if (isServiceValue(value)) setField("service", value);
            }}
          >
            <SelectTrigger
              id={fieldId("service")}
              aria-required="true"
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service", errors.service)}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field
        field="message"
        label="Message"
        error={errors.message}
        hint="Please do not include passwords or banking credentials."
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", errors.message, true)}
        />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="inquiry-website">Leave this field empty</label>
        <input
          id="inquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setField("website", event.target.value)}
        />
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto sm:min-w-52"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
              Sending…
            </>
          ) : (
            "Send an Inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
