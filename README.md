# Rexsis Consultancy — website

Landing page for Rexsis Consultancy (rexsis.com). Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui, Lucide icons.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000

npm run lint         # ESLint
npx tsc --noEmit     # type-check
npm run build        # production build
npm run start        # serve the production build
```

Requires Node 20.9 or newer.

## Before going live — what still needs your input

Everything the firm has not supplied is a `null` in **`lib/site-config.ts`**. The site shows neutral wording for each one and never invents details.

| Item | Where | Until it is set |
| --- | --- | --- |
| Business email | `contact.email` | Footer and contact section say "Email details coming soon" |
| Booking link (Calendly, Cal.com…) | `contact.bookingUrl` | Every "Book a Consultation" button scrolls to the inquiry form. Once set, they open the booking page in a new tab |
| Business location | `contact.location` | Contact section shows service coverage instead. Only add a location once confirmed |
| Privacy Policy route | `legal.privacyPolicyHref` | Footer shows "Privacy Policy (coming soon)" as plain text, not a dead link |
| Terms & Conditions route | `legal.termsHref` | Same as above |
| Form delivery | env var `INQUIRY_WEBHOOK_URL` (see `.env.example`) | The form tells visitors their message was **not** sent |
| Final prices | `pricingPlans` in `lib/content.ts` | All three plans read "Custom Quote" |

### Legal pages

Create the pages (for example `app/privacy/page.tsx` and `app/terms/page.tsx`), have them reviewed for your jurisdictions, then set `legal.privacyPolicyHref` to `"/privacy"` and `legal.termsHref` to `"/terms"`. The footer links appear automatically.

### Contact form delivery

The form posts to `app/api/inquiry/route.ts`, which validates the data on the server (same rules as the browser, from `lib/inquiry.ts`) and forwards it to `INQUIRY_WEBHOOK_URL`. It reports success only when that endpoint accepts the message. A hidden honeypot field quietly drops simple bot submissions.

For heavier traffic, add rate limiting or a CAPTCHA in front of the route.

### Hero photo

The hero uses a free-to-use photograph from Unsplash (Unsplash License, commercial use allowed, no attribution required), configured in `lib/site-config.ts → hero.image`. If it ever fails to load, the hero falls back to its navy background and stays fully readable.

To use your own photo instead: save it as `public/images/hero-business.jpg` (about 2400 px wide, landscape, subject on the right or centre because the text sits on the left), then set `hero.image.src` to `"/images/hero-business.jpg"` and update the `alt` text to describe it. A real photo of your team or office will do more for trust than any stock image.

## Structure

```
app/
  layout.tsx            fonts, metadata, Organization JSON-LD
  page.tsx              page composition
  globals.css           brand tokens (colors, radius) + shadcn token mapping
  api/inquiry/route.ts  server-side form handler
  opengraph-image.tsx   generated social-share image (text only)
  icon.svg, robots.ts, sitemap.ts
components/
  site/                 navbar, mobile-menu, hero, services, how-it-works,
                        pricing, contact, contact-form, cta-section, footer…
  ui/                   shadcn/ui: button, card, input, label, select,
                        sheet, textarea
lib/
  site-config.ts        business details (edit this)
  content.ts            services, process steps, pricing plans, nav, footer links
  inquiry.ts            form validation, service options, submit helper
```

To change copy, services, or pricing plans, edit `lib/content.ts`. To change colors, edit the tokens at the top of `app/globals.css`.

## Notes

- **Fonts** are self-hosted through `next/font/local` (Newsreader for headings, DM Sans for body, both SIL Open Font License), so there are no requests to third-party font servers.
- **Cache Components** is enabled (the Next.js 16 default from `create-next-app`). The footer year is generated dynamically and cached for a day.
- **Animations** are CSS-only and switch off for visitors who prefer reduced motion. With JavaScript disabled, all content is visible.
- **Metadata** uses `https://rexsis.com` as the canonical URL. Change `url` in `lib/site-config.ts` if the production domain differs.
