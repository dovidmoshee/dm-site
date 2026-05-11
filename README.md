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
NEXT_PUBLIC_SITE_URL=https://www.cohevo.co
```

If not set, the site defaults to `https://www.cohevo.co` in production and `http://localhost:3000` in development. If you accidentally set the apex domain, the app normalizes SEO-facing URLs back to `www`.

### Optional SMTP email sending (Google Workspace compatible)

MX records only let Google Workspace receive mail for the domain. The website still needs SMTP credentials so the server can send the contact-form notification.

Form submissions are emailed via nodemailer when `SMTP_USER` and `SMTP_PASS` are set. For Google Workspace on Gmail, create a Google App Password for the actual Google account you sign in with and add these variables in your host (for example, Vercel):

```bash
SMTP_USER=david@calibratemedia.ca
SMTP_PASS=your_google_app_password
```

If `cohevo.co` is a secondary domain or alias on the `calibratemedia.ca` workspace, `SMTP_USER` is usually the primary Google Workspace login, while `SMTP_FROM` can be the verified Gmail send-as alias. By default the app uses Gmail SMTP (`smtp.gmail.com:587`), sends from `Cohevo <hi@cohevo.co>`, and sends notifications to `david@cohevo.co`. Set `SMTP_TO` to the exact inbox you check if needed:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM="Cohevo <hi@cohevo.co>"  # must match the mailbox or an allowed Gmail send-as alias
SMTP_TO=david@calibratemedia.ca
```

Behavior:
- With `SMTP_USER` and `SMTP_PASS`: sends email notifications.
- With HubSpot vars (below): creates/updates a HubSpot contact as a lead.
- Without SMTP credentials or HubSpot vars in production: shows the delivery error instead of pretending the message was sent.
- Without SMTP credentials or HubSpot vars in local development: saves submissions to JSON.

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
