# Cohevo lead scoring methodology review

Reviewed local LinkedIn export scoring outputs:
- cohevo_warm_leads_scored.csv: 1005 rows
- cohevo_top_warm_leads.md
- cohevo_first_outreach_batch.md

Goal: improve prioritization for first-client discovery calls for Cohevo: Business OS setup for 3 to 20 person SaaS, agency, services, and operator-led teams.

## Main finding

The current score is a useful first pass, but it overweights generic seniority and raw message count, and underweights whether the company is actually an ICP buyer with budget and operational pain.

For first-client discovery, score should answer: who is likely to take a call now and either buy a small systems audit/build or introduce someone who will?

## Recommended scoring model

Use separate sub-scores, then combine.

1. ICP fit, 0 to 40
- Agency, studio, marketing, dev shop, media, design: strong fit.
- SaaS, software, AI, productized tech: strong fit if 3 to 20 people.
- B2B services with repeatable delivery such as bookkeeping, recruiting, outsourcing, IT services, accounting, consulting: good fit.
- Local service or product businesses: only good if multi-person operational complexity is clear.
- Nonprofit, religious, charity, foundation, school, community org: referral or discovery only, not buyer pipeline.
- Enterprise employees: referral or intel only unless they own a side business or can introduce a buyer.

2. Buyer role, 0 to 20
- Founder, co-founder, CEO, owner, managing partner, president: highest.
- COO, VP Ops, Head of Ops, Delivery, Implementation, RevOps: high.
- Sales, growth, marketing leaders at small firms: medium.
- Individual contributors, students, recruiters, advisor-only, investor-only: low unless a referral path is clear.

3. Warmth quality, 0 to 30
- Recent explicit commercial signal: highest. Example: Danny Bendelman should outrank many older high-score contacts because he recently mentioned Cohevo and AI automation.
- Recent real conversation within 12 months: high.
- Substantive older relationship: medium.
- Generic thanks-for-connecting, birthday wishes, student/informational messages: very low, even if message count is high.
- Email availability is useful but should be a small boost only.

4. Timing and urgency, 0 to 20
- Recent connection, role change, company launch, growth, hiring, or AI/automation language.
- Recent conversation about business systems, workflow, AI, automation, or intros.

5. Risk and disqualification, negative 0 to 30
- Same-name or self collision: suppress.
- Nonprofit/religious/community context: move to referral track.
- Enterprise employee: move to referral or market-intel track.
- Competitor or adjacent AI consultant: partner track, not direct buyer track.
- Unknown or inactive company: research first.
- Likely solo/consumer/local business: lower priority unless team complexity is verified.

## Fields to add

Add columns to the CSV or review sheet:
- ICP Segment Normalized
- Buyer Role
- Company Size Estimate
- Business Model
- Ops Pain Hypothesis
- Warmth Quality
- Last Meaningful Interaction
- Outreach Track: direct buyer, referral, partner, research, suppress
- Disqualifier
- Next Action
- Research Notes

## False positives identified

- Shalom Goodman, Collective Kindness: very warm, but likely nonprofit/community. Use referral/discovery framing, not buyer pitch.
- Rabbi Michoel Csillag, Jewish Services Canada: religious/nonprofit context. Not first-client buyer unless verified as paid services operation with budget.
- David Ehrentreu, Rettinger Fireplace Systems: same-name identity collision risk. Suppress until manually verified.
- Maxine Isaacs, MMI Bookkeeping Services: possible small business fit, but message history is community/personal. Research before outreach.
- Pauline Caballero, Power Yoga Collective: likely consumer/local wellness. Lower first-client priority unless multi-location or team ops pain is clear.
- Matt Johnston, Collective Arts: may be larger/consumer product. Research before outreach.
- Andy Cabasso, ClickUp: enterprise employee. Useful for intel/referrals, not direct buyer pipeline.
- Roei Tenenbaum, RoeiAI: adjacent AI implementation consultant. Use partner/market-intel track, not direct-client pitch.

## False negatives or underweighted leads

- Danny Bendelman, Hive Collective: should be top priority because of recent 2026 message and AI automation relevance.
- Vitalii Borodin, Zfort Group: delivery and operations role; likely valuable discovery even if not founder.
- David Marcel dos Santos, Qrious Eye Studio: agency operations role; likely relevant to delivery handoffs.
- Unknown-segment but warm founders such as Ari Treitel, Lea Hoffman, Chaim Rivlin, Ari Rush: need manual research before being buried.
- IT, MSP, outsourcing, recruiting, accounting, and bookkeeping businesses: may be stronger than generic consultants because they have repeatable workflow pain.
- Recent agency founders with no message history such as Moshe Ben Haim, Liran Galizyan, Emese Janosi-Mozes, Harshraj Jhala, Anthony Frasca: no message history should not bury them if ICP fit is strong.

## Recommended immediate first-batch adjustment

Outreach now as direct buyers:
1. Danny Bendelman
2. Emanuel Petrescu
3. Jason Hamilton
4. Nissar Ahamed
5. Jimmy Bitton
6. Moshe Ben Haim
7. Joachim Koch, after size check
8. Adam Weitner, lower warmth due to age
9. Menachem Feuer
10. Stephanie Allen, but frame as operator or referral partner as much as buyer

Move to referral or partner track:
- Shalom Goodman: referral/discovery
- Roei Tenenbaum: partner/market intel

Research or suppress before pitch:
- David Ehrentreu
- Rabbi Michoel Csillag
- Maxine Isaacs
- Pauline Caballero
- Matt Johnston

## Next 30 people to research

Agency and studio direct-buyer candidates:
1. Moshe Ben Haim, B.H Digital Marketing
2. Liran Galizyan, Terrific Digital
3. Emese Janosi-Mozes, SciArt Agency
4. Harshraj Jhala, Evercore Digital Solutions
5. Anthony Frasca, Frasca Digital
6. Nano Stasiak, Impulso Media
7. Lorne Bronstein, SpaceTree Media
8. Antreas Georgiades, Seedhub Media
9. Todd Foster, Merged Media Ltd.
10. Rob Levy, Evolve Agency Group
11. Rob Fiocca, fioccastudio.com
12. Mir Lada, Canteen Studios

SaaS, tech, AI, and productized businesses:
13. Laurynas Pletkus, Scale Tech
14. Menachem Feuer, The Community Tech
15. Mendel Blesofsky, Cevro AI
16. Steve Smith, Cakemail
17. Vik Bhatia, Scopify AI
18. Daniel Warner, ChaiTech
19. Francesca Ortepi, Dentech Direct
20. Yosi Dahan, Calltuv
21. Chaim Rivlin, RentSeeker
22. Darren Portelli, Crazy D's Prebiotic Soda Labs, lower priority unless ops complexity is clear

Professional services and operations-heavy businesses:
23. Aryeh Munk, MSA Outsourcing Solutions LLC
24. Aaron Kalmanson, AB Hires and Consulting
25. Sruli Wolff, Wolff Adar IT Solutions
26. Dov Herman, Herman and Meyer Accounting Services Inc.
27. Oleksandr Bomshteyn, Bomshteyn Consulting
28. Avrohom Bernstein, 2M7 Financial Solutions
29. Michael Abraham, Huddle Underwriting Solutions Inc.
30. Charlotte Vanderploeg, Pond Pro Canada and USA

Alternates:
- David Marcel dos Santos, Qrious Eye Studio
- Vitalii Borodin, Zfort Group
- Andrew Sorlie, Stature Films
- Ari Treitel, Review Guards LLC
- Lea J. Hoffman, GPGC
- Muneer Nawab, AmpGrowth.com
- Alex Kovalov, OMNIsquad

## Outreach tracks

Direct buyer message: focus on founder-led operational leakage: onboarding, delivery handoffs, reporting, CRM updates, SOPs, repeated admin, and practical AI automation.

Referral message: for warm but imperfect fits, ask to sanity-check the offer and request intros to founders/operators with ops chaos.

Partner message: for AI consultants, fractional COOs, agencies, and implementation peers, ask to compare notes on demand and partner opportunities.

## Practical cadence

Week 1: send 8 to 12 highly personalized direct-buyer messages and 5 referral messages. Aim for 3 to 5 calls.

Week 2: research the next 30, outreach to the best 10 to 15 verified buyers, and ask every call for one relevant intro.

Success metric: replies, calls booked, pain intensity, and willingness to pay for a concrete first implementation, not the raw lead score.
