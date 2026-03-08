# Calibrate Media Website

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
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If not set, the site defaults to `http://localhost:3000`.

### Optional SMTP email sending

If all values below are set, form submissions are emailed via nodemailer:

```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM="Calibrate Media <hello@your-domain.com>"
SMTP_TO=hello@your-domain.com
```

Behavior:
- With SMTP vars: sends email notifications.
- Without SMTP vars: saves submissions to JSON.

Fallback storage location:
- Local dev: `data/contact-submissions.json`
- Vercel runtime: `/tmp/contact-submissions.json` (ephemeral)

For persistent production handling, set SMTP env vars.

## Calendly Placeholder

The booking placeholder link is configured in:

- `lib/site.ts` → `calendlyPlaceholderUrl`

Update that value to your real scheduling URL.

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
