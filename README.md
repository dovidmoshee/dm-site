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
  - JSON file fallback storage when SMTP env vars are not set

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
NEXT_PUBLIC_SITE_URL=https://cohevo.co
```

If not set, the site defaults to `https://cohevo.co` in production and `http://localhost:3000` in development.

### Optional SMTP email sending (Google Workspace compatible)

If all values below are set, form submissions are emailed via nodemailer.
For Google Workspace (`@your-domain.com` on Gmail), use Gmail SMTP with an App Password:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hello@your-domain.com
SMTP_PASS=your_google_app_password
SMTP_FROM="Cohevo <hello@your-domain.com>"  # must match the mailbox or an allowed alias
SMTP_TO=hello@your-domain.com
```

Behavior:
- With SMTP vars: sends email notifications.
- With HubSpot vars (below): creates/updates a HubSpot contact as a lead.
- Without either SMTP or HubSpot vars: saves submissions to JSON.

### Optional HubSpot lead sync

If `HUBSPOT_ACCESS_TOKEN` is set, each submission is upserted to HubSpot Contacts using email as the unique key and `lifecyclestage=lead`.

```bash
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token
```

Optional: map extra form fields into your own HubSpot custom contact properties:

```bash
HUBSPOT_TEAM_SIZE_PROPERTY=team_size
HUBSPOT_BOTTLENECK_PROPERTY=biggest_bottleneck
HUBSPOT_MESSAGE_PROPERTY=inquiry_message
HUBSPOT_CHECKLIST_PROPERTY=wants_checklist
```

If these custom properties are not created in HubSpot, leave these env vars unset.

Fallback storage location:
- Local dev: `data/contact-submissions.json`
- Vercel runtime: `/tmp/contact-submissions.json` (ephemeral)

For persistent production handling, set SMTP env vars.

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
