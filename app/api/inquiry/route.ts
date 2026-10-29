// import { NextResponse } from "next/server";

// import {
//   isServiceValue,
//   serviceOptions,
//   validateInquiry,
//   type InquiryValues,
// } from "@/lib/inquiry";
// import { siteConfig } from "@/lib/site-config";

// /**
//  * POST /api/inquiry
//  *
//  * Validates the inquiry on the server, then forwards it as JSON to the
//  * destination in the INQUIRY_WEBHOOK_URL environment variable (a Formspree /
//  * Make / Zapier / n8n endpoint, or your own service that sends the email).
//  *
//  * Until that variable is set the route answers 503 "not_configured" and the
//  * form tells visitors plainly that nothing was sent. It never reports success
//  * unless the destination accepted the message.
//  */

// const FORWARD_TIMEOUT_MS = 10_000;

// function parseBody(raw: unknown): InquiryValues | null {
//   if (!raw || typeof raw !== "object") return null;
//   const body = raw as Record<string, unknown>;
//   const text = (key: string) => (typeof body[key] === "string" ? body[key] : "");

//   return {
//     name: text("name"),
//     email: text("email"),
//     country: text("country"),
//     service: text("service") as InquiryValues["service"],
//     message: text("message"),
//     website: text("website"),
//   };
// }

// export async function POST(request: Request) {
//   let raw: unknown;
//   try {
//     raw = await request.json();
//   } catch {
//     return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
//   }

//   const values = parseBody(raw);
//   if (!values) {
//     return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
//   }

//   // Honeypot filled in: almost certainly a bot. Drop it quietly.
//   if (values.website.trim() !== "") {
//     return NextResponse.json({ ok: true });
//   }

//   const errors = validateInquiry(values);
//   if (Object.keys(errors).length > 0 || !isServiceValue(values.service)) {
//     return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 400 });
//   }

//   const destination = process.env.INQUIRY_WEBHOOK_URL;
//   if (!destination) {
//     return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
//   }

//   const serviceLabel =
//     serviceOptions.find((option) => option.value === values.service)?.label ?? values.service;

//   try {
//     const response = await fetch(destination, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify({
//         name: values.name.trim(),
//         email: values.email.trim(),
//         country: values.country.trim(),
//         service: values.service,
//         serviceLabel,
//         message: values.message.trim(),
//         submittedAt: new Date().toISOString(),
//         source: siteConfig.url,
//       }),
//       signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
//     }
//   } catch {
//     return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
//   }

//   return NextResponse.json({ ok: true });
// }



import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  isServiceValue,
  serviceOptions,
  validateInquiry,
  type InquiryValues,
} from "@/lib/inquiry";
import { siteConfig } from "@/lib/site-config";

const EMAIL_TIMEOUT_MS = 10_000;

function parseBody(raw: unknown): InquiryValues | null {
  if (!raw || typeof raw !== "object") return null;

  const body = raw as Record<string, unknown>;
  const text = (key: string) =>
    typeof body[key] === "string" ? body[key] : "";

  return {
    name: text("name"),
    email: text("email"),
    country: text("country"),
    service: text("service") as InquiryValues["service"],
    message: text("message"),
    website: text("website"),
  };
}

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request" },
      { status: 400 },
    );
  }

  const values = parseBody(raw);

  if (!values) {
    return NextResponse.json(
      { ok: false, code: "bad_request" },
      { status: 400 },
    );
  }

  // Silently discard submissions caught by the honeypot.
  if (values.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validate the submitted inquiry on the server.
  const errors = validateInquiry(values);

  if (
    Object.keys(errors).length > 0 ||
    !isServiceValue(values.service)
  ) {
    return NextResponse.json(
      { ok: false, code: "invalid", errors },
      { status: 400 },
    );
  }

  // Read private Gmail credentials from server-side environment variables.
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword =
    process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const recipient = process.env.INQUIRY_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPassword || !recipient) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
    );
  }

  const serviceLabel =
    serviceOptions.find(
      (option) => option.value === values.service,
    )?.label ?? values.service;

  const name = values.name.trim();
  const email = values.email.trim();
  const country = values.country.trim();
  const message = values.message.trim();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
      connectionTimeout: EMAIL_TIMEOUT_MS,
      greetingTimeout: EMAIL_TIMEOUT_MS,
      socketTimeout: EMAIL_TIMEOUT_MS,
    });

    await transporter.sendMail({
      from: {
        name: "Rexsis Consultancy",
        address: gmailUser,
      },
      to: recipient,
      replyTo: email,
      subject: `New website inquiry: ${serviceLabel}`,
      text: [
        "You received a new inquiry from the Rexsis Consultancy website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Country / jurisdiction: ${country}`,
        `Service: ${serviceLabel}`,
        `Submitted at: ${new Date().toISOString()}`,
        `Website: ${siteConfig.url}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error(
      "[api/inquiry] Email delivery failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      { ok: false, code: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
