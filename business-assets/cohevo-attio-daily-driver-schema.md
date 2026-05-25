# Cohevo Attio Daily Driver Schema

Purpose: make Attio the source of truth for Cohevo outreach, conversations, follow-ups, audits, proposals, and early client development. WhatsApp/Hermes acts as the command center, Attio holds the records.

## Operating Principle

Every person/company in Attio should answer four questions quickly:

1. Who are they and how does David know them?
2. Why might Cohevo be relevant to them?
3. What is the current status?
4. What is the next action and when?

Avoid overbuilding. At zero clients, the CRM should drive daily conversations, not become admin work.

---

## Core Objects

### 1. People

Use Attio People as the main working object for outreach.

Required fields:

| Field | Type | Description |
|---|---|---|
| Cohevo Status | Single select | Current pipeline stage for this person |
| Relationship Warmth | Single select | How warm the relationship is |
| Lead Type | Single select | Direct client, referral partner, peer, vendor, unknown |
| Lead Source | Single select | LinkedIn, old contact, referral, WhatsApp, prior client, event, other |
| Priority | Single select | High, Medium, Low, Parked |
| Pain Hypothesis | Long text | What operational/workflow pain they may have |
| Best Outreach Angle | Long text | The specific angle/message direction |
| Last Contacted | Date | Most recent outreach/follow-up date |
| Next Follow-Up | Date | When to follow up next |
| Next Action | Short text | The immediate action required |
| Outreach Channel | Single select | LinkedIn, Email, WhatsApp, Phone, In-person, Other |
| Message History Notes | Long text | Important prior message context, especially unanswered messages |
| Last Reply Summary | Long text | What they said most recently |
| Call Notes | Long text | Notes from any call/conversation |
| Offer Fit | Single select | Strong, Possible, Weak, Referral only, Not fit |
| Proposed Offer | Single select | Ops audit, paid pilot, workflow cleanup, CRM/setup, referral ask, unclear |
| Owner Dependency Signal | Checkbox | Indicates business may depend heavily on owner/manual coordination |
| Ops Complexity Signal | Checkbox | Indicates likely messy workflows/handoffs/follow-ups |
| Do Not Contact | Checkbox | Exclude from outreach |

Optional fields:

| Field | Type | Description |
|---|---|---|
| LinkedIn Profile | URL | Profile URL |
| Personal Context | Long text | How David knows them personally |
| Referral Ask Notes | Long text | If they are better as a referral source |
| Draft Message | Long text | Current draft message to send |
| Objections | Long text | Any stated objections or reasons for delay |

---

### 2. Companies

Use Companies to understand fit and operational complexity.

Required fields:

| Field | Type | Description |
|---|---|---|
| Company Type | Single select | Agency, Consulting, Professional services, SaaS, Ecommerce, Nonprofit, Other |
| Cohevo Fit | Single select | Strong, Possible, Weak, Not fit |
| Service Business? | Checkbox | True if they sell services/delivery-heavy work |
| Ops Complexity | Single select | High, Medium, Low, Unknown |
| Likely Workflow Pain | Long text | Where operations may be messy |
| Growth Signal | Single select | Hiring, expanding, active content, new offer, unknown, none |
| Website | URL | Company site |
| LinkedIn Company | URL | Company LinkedIn |
| Notes | Long text | General research notes |

Optional fields:

| Field | Type | Description |
|---|---|---|
| Tools Mentioned | Multi select or text | HubSpot, Airtable, Notion, Slack, Monday, etc. |
| Delivery Complexity Notes | Long text | Client delivery, onboarding, handoffs, reporting, support, etc. |
| Potential Quick Win | Long text | One likely practical improvement |

---

### 3. Opportunities / Deals

Use only when a conversation becomes real. Do not create deals for every lead.

Create an opportunity when:

- A call is booked
- They agreed to an audit
- They asked for a proposal
- There is a specific workflow/problem to solve
- They referred a concrete prospect

Required fields:

| Field | Type | Description |
|---|---|---|
| Opportunity Stage | Single select | See stages below |
| Opportunity Type | Single select | Direct client, referral, partner, advisory, unknown |
| Problem Statement | Long text | The actual business/workflow problem |
| Proposed Scope | Long text | What Cohevo might do |
| Next Step | Short text | Immediate next action |
| Next Step Date | Date | Due date |
| Estimated Value | Currency | Optional at this stage |
| Proposal Sent? | Checkbox | Whether a proposal was sent |
| Decision Notes | Long text | Who decides, timing, constraints |

---

## Cohevo Status Values for People

Use these statuses for People:

1. Unreviewed
2. Research next
3. Ready to message
4. Message drafted
5. Messaged
6. Follow-up due
7. Replied
8. Call suggested
9. Call booked
10. Call completed
11. Audit offered
12. Proposal sent
13. Won
14. Lost / not now
15. Nurture later
16. Referral / partner
17. Not a fit
18. Do not contact

Recommended daily views should filter mostly around:

- Ready to message
- Message drafted
- Follow-up due
- Replied
- Call suggested
- Call booked
- Call completed
- Audit offered
- Proposal sent

---

## Relationship Warmth Values

1. Very warm: close relationship, active or recent direct contact
2. Warm: knows David, likely to reply
3. Dormant warm: old friend/contact, needs rewarm first
4. Light connection: LinkedIn/weak tie, possible context
5. Cold: no meaningful relationship
6. Unknown

Rule: warm relationship beats perfect ICP fit at this stage.

---

## Lead Type Values

1. Direct client
2. Referral partner
3. Peer / collaborator
4. Investor / advisor
5. Vendor / tool provider
6. Community contact
7. Unknown
8. Not relevant

Do not force direct-client framing on referral partners or peers.

---

## Priority Values

1. High: reach out this week
2. Medium: good but not urgent
3. Low: only if recognized or later
4. Parked: keep record but do not work now

Priority should account for warmth + fit + likely reply, not just company size.

---

## Opportunity Stages

1. Conversation opened
2. Discovery needed
3. Discovery scheduled
4. Discovery completed
5. Audit offered
6. Audit in progress
7. Proposal needed
8. Proposal sent
9. Waiting on decision
10. Won
11. Lost
12. Nurture later
13. Referral in progress

---

## Views to Create in Attio

### Daily Driver

Filter:
- Do Not Contact is false
- Cohevo Status is one of: Ready to message, Message drafted, Follow-up due, Replied, Call suggested, Call booked, Call completed, Audit offered, Proposal sent

Sort:
1. Next Follow-Up ascending
2. Priority High first
3. Relationship Warmth warmest first

### Follow-Up Due

Filter:
- Next Follow-Up is today or before today
- Status is not Won, Not fit, Do not contact, Lost unless Nurture later

### Ready to Message

Filter:
- Cohevo Status = Ready to message or Message drafted
- Do Not Contact is false

Sort:
- Priority High first
- Relationship Warmth warmest first

### Warm Dormant Relationships

Filter:
- Relationship Warmth = Very warm, Warm, or Dormant warm
- Last Contacted is empty or older than 30 days
- Do Not Contact is false

### Conversations in Motion

Filter:
- Status is Replied, Call suggested, Call booked, Call completed, Audit offered, Proposal sent

### Referral / Partner Pipeline

Filter:
- Lead Type = Referral partner or Peer / collaborator
- Status is Referral / partner, Replied, Call booked, Call completed, Nurture later

### Parked / Nurture

Filter:
- Status = Nurture later or Priority = Parked

---

## Daily WhatsApp Commands

### “Cohevo morning”

Hermes should pull or review Attio and return:

1. Top 3 people to message today
2. Top 2 follow-ups due
3. Any active conversations needing a next step
4. One person/company to research deeper
5. One asset/content/action to move Cohevo forward

### “Update Cohevo: …”

David can send messy updates by text or voice. Hermes should convert them into:

- Updated status
- Clean note
- Next action
- Next follow-up date
- Draft response if needed
- Opportunity creation if the conversation becomes real

### “Cohevo wrap”

Hermes should summarize:

- Who was contacted
- Who replied
- What needs follow-up
- What changed in pipeline
- Market language or pain points learned
- Tomorrow’s best next actions

---

## MCP / API Integration Plan

Phase 1: Read-only

- List Attio objects
- List fields
- Search people
- Fetch people by status/view
- Fetch company records
- Pull due follow-ups

Phase 2: Safe write with confirmation

- Add note to person/company
- Update status
- Update next action
- Set next follow-up date
- Save draft message

Phase 3: Full daily driver

- Create people/companies from lead lists
- Create opportunities when a call/audit/proposal is real
- Update records directly from WhatsApp voice notes
- Generate daily morning and wrap reports from Attio

Rule: start read-only, then confirm before writes until the schema is stable.

---

## First Setup Checklist

1. Confirm existing Attio objects: People, Companies, Opportunities/Deals, Tasks/Notes.
2. Add the Cohevo fields to People.
3. Add the Cohevo fields to Companies.
4. Add opportunity fields only if Attio has a deal/opportunity object already.
5. Create the daily views.
6. Import or tag the first 25 warm-ish leads.
7. Mark 5 as Ready to message.
8. Create drafts for the top 3.
9. Use Attio as source of truth for follow-up dates.
10. Connect MCP/API read-only.

---

## Initial Weekly Scorecard

Track weekly:

- Warm people reviewed
- Messages sent
- Follow-ups sent
- Replies received
- Calls booked
- Calls completed
- Audits offered
- Proposals sent
- Clients won
- Referral opportunities opened
- Most common pain language heard

At this phase, the most important numbers are conversations, replies, calls, and concrete pain discovered.
