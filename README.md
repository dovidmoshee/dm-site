# Cohevo Website

Production-ready marketing site built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, and Framer Motion.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- lucide-react icons
- Framer Motion (subtle reveal animations)
- Contact form server action with:
  - `nodemailer` email delivery when SMTP env vars are set
  - Attio person record upsert when Attio env vars are set
  - JSON file fallback storage for local development when delivery env vars are not set

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in project root.

### Required for production metadata

```bash
NEXT_PUBLIC_SITE_URL=https://www.cohevo.co
```

If not set, the site defaults to `https://www.cohevo.co` in production and `http://localhost:3000` in development. If you accidentally set the apex domain, the app normalizes SEO-facing URLs back to `www`.

### Optional SMTP email sending (Google Workspace compatible)

Form submissions are emailed via nodemailer when `SMTP_USER` and `SMTP_PASS` are set.
For Google Workspace on Gmail, create a Google App Password for the sending mailbox and add these variables in your host (for example, Vercel):

```bash
SMTP_USER=hi@cohevo.co
SMTP_PASS=your_google_app_password
```

By default the app uses Gmail SMTP (`smtp.gmail.com:587`), sends from `Cohevo <SMTP_USER>`, and sends notifications to `david@cohevo.co`. Override any of those defaults only if needed:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM="Cohevo <hi@cohevo.co>"  # must match the mailbox or an allowed Gmail alias
SMTP_TO=david@cohevo.co
```

Behavior:
- With `SMTP_USER` and `SMTP_PASS`: sends email notifications.
- With Attio vars (below): creates or updates an Attio person record using the submitter's email address.
- Without SMTP credentials or Attio vars in production: shows the delivery error instead of pretending the message was sent.
- Without SMTP credentials or Attio vars in local development: saves submissions to JSON.

### Optional Attio lead sync

If `ATTIO_ACCESS_TOKEN` is set, each submission is asserted to Attio People using `email_addresses` as the matching attribute. This creates the person if they do not exist yet and updates the existing person if they submit again. The token needs Attio's `record_permission:read-write` and `object_configuration:read` scopes.

```bash
ATTIO_ACCESS_TOKEN=your_attio_access_token
```

By default the integration sends the visitor's name, email, and a `description` containing the full form submission. Optional: map extra form fields into your own Attio custom person attributes by setting the attribute slugs or IDs:

```bash
ATTIO_COMPANY_ATTRIBUTE=company_name
ATTIO_TEAM_SIZE_ATTRIBUTE=team_size
ATTIO_BOTTLENECK_ATTRIBUTE=biggest_bottleneck
ATTIO_MESSAGE_ATTRIBUTE=inquiry_message
ATTIO_CHECKLIST_ATTRIBUTE=wants_checklist
ATTIO_SOURCE_ATTRIBUTE=lead_source
```

If these custom attributes are not created in Attio, leave these env vars unset.

Fallback storage location:
- Local dev: `data/contact-submissions.json`
- Vercel runtime: `/tmp/contact-submissions.json` (ephemeral)

For persistent production handling, set SMTP and/or Attio env vars.

## Calendly Link

The contact page booking link is configured in:

- `lib/site.ts` → `calendlyPlaceholderUrl`

Update that value if your Calendly handle or event URLs change.

## Editing Copy and Content

Primary content sources:

- `lib/site.ts`
  - Navigation links
  - Packages
  - FAQ items
  - Testimonials
  - Process phase content
  - Form select options
- Route pages in `app/`
  - `/` → `app/page.tsx`
  - `/offer` → `app/offer/page.tsx`
  - `/process` → `app/process/page.tsx`
  - `/pricing` → `app/pricing/page.tsx`
  - `/about` → `app/about/page.tsx`
  - `/faq` → `app/faq/page.tsx`
  - `/contact` → `app/contact/page.tsx`
  - `/thank-you` → `app/thank-you/page.tsx`
  - `/legal/privacy` → `app/legal/privacy/page.tsx`
  - `/legal/terms` → `app/legal/terms/page.tsx`

## SEO Files

- Global/page metadata via `lib/seo.ts` and each page export
- Sitemap: `app/sitemap.ts`
- Robots: `app/robots.ts`
- OG image: `public/og-image.svg`

## Deploy to Vercel

This app is deployable to Vercel with zero code changes.

1. Push to your Git provider.
2. Import the repo in Vercel.
3. Set env vars (`NEXT_PUBLIC_SITE_URL` and optional SMTP vars).
4. Deploy.
