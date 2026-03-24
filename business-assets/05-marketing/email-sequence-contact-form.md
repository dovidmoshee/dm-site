# Contact Form Email Sequence
**Calibrate Media — Post-Form Nurture**

Triggered when someone submits the contact form at calibratemedia.com/contact.
Sequence goal: move them from "interested" to "audit call booked" within 9 days.

---

## Sequence Overview

| # | Send timing | Subject line | Goal |
|---|-------------|--------------|------|
| 1 | Immediately | Got your message — here's what happens next | Confirm, deliver value, set expectation |
| 2 | Day 2 | The real reason your team feels stretched | Build trust with insight |
| 3 | Day 4 | What 30 days actually looks like | Make the outcome concrete |
| 4 | Day 6 | Is now the right time? | Handle the "not yet" objection |
| 5 | Day 9 | Closing the loop | Final nudge, no pressure |

---

## Email 1 — Immediate confirmation

**Subject:** Got your message — here's what happens next
**Preview text:** You'll hear back within one business day. In the meantime, here's something useful.

---

Hi {{first_name}},

Got it. Your message came through.

I'll review what you shared and follow up within one business day with some initial thoughts and, if it seems like a fit, a link to book a 30-minute audit call.

The call is straightforward. No pitch deck, no generic discovery script. We'll look at your current setup, identify where the friction is, and I'll give you a clear read on what's actually worth fixing first.

{{#if checklist_opted_in}}
You also checked the box for the Business Systems Checklist — here it is: [Download the checklist →]

It's a quick audit of the six areas where most founder-led teams lose time. Worth running through before we talk.
{{/if}}

In the meantime, if something feels urgent or you'd rather just get straight to it:

[Book the audit call now →]

Talk soon,
David
Calibrate Media

---

## Email 2 — Day 2: The core insight

**Subject:** The real reason your team feels stretched
**Preview text:** It's not a capacity problem. It's a system problem.

---

Hi {{first_name}},

Most founders I talk to think they need more people.

What they actually need is a cleaner system.

When tasks are scattered across tools, handoffs are informal, and reporting is manual — the team spends a significant chunk of every week managing the business instead of running it. Adding headcount just distributes the chaos more evenly.

The teams that scale without burning out all share one thing: a clear operating system. Defined ownership. Consistent handoffs. One source of truth for reporting.

It's not complicated. It's just not how most teams are set up by default.

That's what the audit call is designed to surface — exactly where your setup is costing you time, and what to clean up first.

If you haven't booked yet, here's the link:

[Book your free 30-minute audit call →]

No obligation. You'll leave with a clear picture of where the leverage is, regardless of whether we work together.

David
Calibrate Media

---

## Email 3 — Day 4: Make the outcome concrete

**Subject:** What 30 days actually looks like
**Preview text:** Specific deliverables. No ambiguity about what you're getting.

---

Hi {{first_name}},

A question I get asked a lot: what exactly do you deliver in 30 days?

Here's the short version.

**Week 1 — Audit and map**
We look at how work currently moves through your business. Sales intake, handoffs, delivery, reporting. We identify the friction points and prioritize by impact.

**Week 2 — Clean up and connect**
We simplify the workflows that are costing the most time. That usually means standardizing handoffs, consolidating tools, and setting up one source of truth for reporting.

**Week 3 — Automate the repetitive parts**
Once the process is clean, we layer in automations. Follow-up sequences, task creation, reporting dashboards. Things that run without someone triggering them manually.

**Week 4 — Handoff and document**
Everything is documented so your team can maintain it. No black box. No dependency on us for things to keep running.

By the end: your team spends less time on admin, handoffs don't fall through the cracks, and you can see pipeline and delivery status without chasing anyone for an update.

If that sounds useful, the audit call is the right first step.

[Book the 30-minute audit call →]

David
Calibrate Media

---

## Email 4 — Day 6: Handle the objection

**Subject:** Is now the right time?
**Preview text:** The honest answer, if you're on the fence.

---

Hi {{first_name}},

If you've been meaning to reply or book a call but haven't yet — I get it. The timing never feels perfect.

Most teams I work with say the same thing before we start: "We're just too busy right now." And they're usually right. They are too busy.

That's the problem.

When the system is broken, the team is stuck in it. Every week you run on the current setup is another week of manual work, missed handoffs, and reporting that someone has to rebuild from scratch. The business doesn't slow down so you can fix it.

The teams that move forward aren't the ones who found extra time. They're the ones who decided the cost of waiting was higher than the cost of 30 days of focused work.

If that resonates, the audit call is 30 minutes. I'll tell you honestly whether this is the right fit and what the quickest path forward looks like.

[Book the audit call →]

If now genuinely isn't right, no pressure. You can always come back when it is.

David
Calibrate Media

---

## Email 5 — Day 9: Close the loop

**Subject:** Closing the loop
**Preview text:** Last note from me — keeping it short.

---

Hi {{first_name}},

Last note from me on this.

If you're still interested in sorting out your systems, the audit call is open: [Book here →]

If the timing isn't right or you've gone another direction — no problem at all.

Either way, feel free to reach out whenever it makes sense. The link above is always current.

David
Calibrate Media

---

## Implementation Notes

**Personalization tokens**
- `{{first_name}}` — from form name field
- `{{checklist_opted_in}}` — conditional block for Email 1 based on checkbox
- Optional: reference `{{bottleneck}}` in Email 2 or 3 for higher relevance (e.g. "Since you flagged reporting as your biggest bottleneck...")

**Stop condition**
Pause the sequence immediately when the lead books an audit call (Calendly webhook) or replies to any email.

**CTA link**
All "Book the audit call" links should go to the Calendly booking page, not the contact form.

**Tone reminders (brand voice)**
- Short sentences. No hype.
- Write like a person, not a marketing team.
- One CTA per email. No secondary links except the checklist in Email 1.
- Plain text format performs best for this audience — avoid heavy HTML templates.
