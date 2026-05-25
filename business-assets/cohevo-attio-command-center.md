# Cohevo Attio Command Center

Implemented local helper for the Attio daily-driver workflow.

Script:

/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py

It is read-only against Attio. It reads `ATTIO_API_KEY` / `ATTIO_ACCESS_TOKEN` from `~/.hermes/.env` and never prints the key.

## Commands

### Audit current implementation

```bash
/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py audit
```

Checks:

- Cohevo Daily Driver list exists and entry count
- Core list fields are present
- Missing recommended Company fields
- Missing recommended Deal/Opportunity fields
- Status counts
- Data quality gaps
- Available source CSVs

### Cohevo morning

```bash
/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py morning
```

Returns:

- Top 3 people to message
- Top follow-ups due
- Active conversations
- One research target
- One Cohevo asset/action

This implements the daily-driver command from the schema file.

### Cohevo wrap

```bash
/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py wrap
```

Returns:

- Pipeline status counts
- Due now/tomorrow items
- Data cleanup gaps
- Tomorrow's best moves

### Generate next Attio import candidates

```bash
/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py import-candidates --limit 25
```

Writes:

/home/davidehrentreu/dm-site/business-assets/03-sales/linkedin-outreach/cohevo_attio_import_candidates.csv

Source files:

- /home/davidehrentreu/dm-site/business-assets/03-sales/linkedin-outreach/cohevo_deep_research_priority.csv
- /home/davidehrentreu/dm-site/business-assets/03-sales/linkedin-outreach/cohevo_warm_leads_scored.csv

It excludes names already in the live Attio Daily Driver list.

### Convert messy update into a safe write plan

```bash
/home/davidehrentreu/dm-site/business-assets/scripts/cohevo_attio_driver.py update-plan "Spoke to Ari, call booked for Tuesday"
```

This does not write to Attio. It turns the update into fields that should be confirmed before writing.

## Current live status from latest audit

- Daily Driver list exists
- Entries: 13
- Core People/list fields: complete
- Current statuses:
  - Research next: 7
  - Ready to message: 4
  - Call booked: 2
- Missing next action on active records: 0
- Missing follow-up date on call/proposal/follow-up records: 0
- Ready/message records with saved draft: 1

## Still intentionally not automated

These are write-side operations and should be confirmed before running:

1. Creating missing Company object fields in Attio
2. Creating missing Deal/Opportunity object fields in Attio
3. Importing the generated candidate CSV into Attio
4. Updating Attio directly from messy updates or voice notes
5. Creating deals/opportunities from booked calls

## Recommended next step

Review:

/home/davidehrentreu/dm-site/business-assets/03-sales/linkedin-outreach/cohevo_attio_import_candidates.csv

Then import/add the first 10-25 candidates into Attio after approval, using People + Cohevo Daily Driver fields.
