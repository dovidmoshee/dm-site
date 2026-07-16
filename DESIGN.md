# Cohevo Design System: The Tech Bench

## Creative north star

The site should feel like bringing a frustrating device to a clean, capable workbench. The problem can be messy. The service is organized, direct, and understandable.

This is not a luxury consultancy, generic SaaS landing page, wellness brand, or anonymous repair chain. It is one practical person who can diagnose across computers, websites, and small-business systems.

## Memorable idea

**You do not need to diagnose it first.**

Every design choice should reduce the visitor's fear that they must explain the problem perfectly before asking for help.

## Visual direction

- Utility-first, confident, and human
- Strong information hierarchy rather than decorative storytelling
- Visible rules, numbered rows, checklists, and diagnostic-panel details
- Flat surfaces with rare shadows
- Square or nearly square corners
- One high-signal lime accent used for action, status, and orientation

## Color

- Paper: `#f4f5ef`
- White surface: `#fffef9`
- Soft utility surface: `#e7ebe2`
- Ink: `#102019`
- Secondary ink: `#31443a`
- Muted text: `#66736c`
- Rule: `#c8d0c7`
- Dark workbench: `#102019`
- Dark secondary: `#172b21`
- Signal lime: `#c8ff00`
- Service green: `#416454`

Lime is rare. It marks the preferred action, availability, price emphasis, or numbered process. It is never used as a large decorative wash except for the short transition strip below the hero.

## Typography

- Primary: Instrument Sans, weights 400, 500, 600
- Utility labels: DM Mono, weights 400, 500
- No decorative display type on the practical-tech homepage
- Hero: `clamp(3.5rem, 6.2vw, 6.6rem)`, weight 600, line-height 0.91, tight tracking
- Section heading: `clamp(2.45rem, 4.3vw, 4.5rem)`, weight 600
- Body: 15px to 18px, line-height 1.5 to 1.65
- Labels: 10px to 12px DM Mono, uppercase, restrained tracking

## Layout

- Maximum shell: 1180px
- Desktop: asymmetric two-column hero, 52/48 split
- Sections: 112px vertical rhythm on desktop, 68px on mobile
- Content uses borders and tonal surfaces before shadows
- Cards align to a strict grid and use 0 to 3px corner radius
- Mobile breakpoint preserves visible actions and avoids hidden hover-only affordances

## Components

### Primary CTA
Dark green on light surfaces. Signal lime in the final dark contact section. Minimum 54px high in the page and 46px in navigation.

### Diagnostic panel
Dark workbench surface with numbered problem rows and a lime offset edge. It proves range without presenting an overwhelming service catalog.

### Audience panels
Two panels: home and small business. The business panel is dark to create immediate visual separation between the two buying contexts.

### Offer cards
Three offers only. The Quick Tech Rescue card is visually featured. Prices are in shekels and visible without interaction.

### Form
Short, explicit, and forgiving. Ask only for name, email, optional business name, closest help category, and a plain-language description.

## Motion

Minimal and functional. Buttons lift by 2px. Arrows shift slightly. FAQ indicators rotate. All transitions stop under `prefers-reduced-motion`.

## Do

- Make WhatsApp available in the first screen
- Make worldwide remote availability and local physical-service boundaries immediately clear
- Show starting prices early
- Use concrete examples of recognizable problems
- Make it clear that imperfect explanations are welcome
- Use direct verbs: send, show, fix, approve

## Do not

- Make remote help sound like abstract consulting instead of practical hands-on assistance
- Relegate local computer help beneath abstract systems work
- Use serif-led luxury editorial styling
- Use generic three-icon SaaS feature cards
- Add gradients, blobs, stock photos, or emoji icons
- Hide prices or require a consultation to learn the starting point
- Promise every problem can be solved inside 90 minutes
