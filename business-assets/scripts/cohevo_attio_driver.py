#!/usr/bin/env python3
"""Cohevo Attio daily-driver helper.

Read-only by default. Uses ATTIO_API_KEY / ATTIO_ACCESS_TOKEN from ~/.hermes/.env
or the process environment. Intended for Hermes/CLI workflows:

  python3 cohevo_attio_driver.py audit
  python3 cohevo_attio_driver.py morning
  python3 cohevo_attio_driver.py wrap
  python3 cohevo_attio_driver.py update-plan "Spoke to Ari..."

No CRM writes are performed by this script.
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import sys
import re
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

BASE_URL = "https://api.attio.com/v2"
DAILY_DRIVER_LIST_ID = "d1402e24-88e5-403f-807c-ed6c2f2a6609"
ASSETS_DIR = Path("/home/davidehrentreu/dm-site/business-assets")
LINKEDIN_EXPORT = ASSETS_DIR / "notion" / "linkedin-connections-leads.csv"
SCORED_LEADS = ASSETS_DIR / "03-sales" / "linkedin-outreach" / "cohevo_warm_leads_scored.csv"
DEEP_RESEARCH = ASSETS_DIR / "03-sales" / "linkedin-outreach" / "cohevo_deep_research_priority.csv"
IMPORT_CANDIDATES = ASSETS_DIR / "03-sales" / "linkedin-outreach" / "cohevo_attio_import_candidates.csv"

ACTIVE_STATUSES = {
    "Ready to message",
    "Message drafted",
    "Follow-up due",
    "Replied",
    "Call suggested",
    "Call booked",
    "Call completed",
    "Audit offered",
    "Proposal sent",
}
MESSAGE_STATUSES = {"Ready to message", "Message drafted"}
CONVERSATION_STATUSES = {
    "Replied",
    "Call suggested",
    "Call booked",
    "Call completed",
    "Audit offered",
    "Proposal sent",
}
FINAL_STATUSES = {"Won", "Not a fit", "Do not contact", "Lost / not now", "Lost"}
WARMTH_ORDER = {
    "Very warm": 0,
    "Warm": 1,
    "Dormant warm": 2,
    "Light connection": 3,
    "Cold": 4,
    "Unknown": 5,
    "": 9,
}
PRIORITY_ORDER = {"High": 0, "Medium": 1, "Low": 2, "Parked": 3, "": 9}

REQUIRED_LIST_ATTRS = [
    "cohevo_status",
    "relationship_warmth",
    "lead_type",
    "lead_source",
    "priority",
    "pain_hypothesis",
    "best_outreach_angle",
    "last_contacted",
    "next_follow_up",
    "next_action",
    "outreach_channel",
    "message_history_notes",
    "last_reply_summary",
    "call_notes",
    "offer_fit",
    "proposed_offer",
    "do_not_contact",
    "personal_context",
    "draft_message",
]

RECOMMENDED_COMPANY_ATTRS = [
    "company_type",
    "cohevo_fit",
    "service_business",
    "ops_complexity",
    "likely_workflow_pain",
    "growth_signal",
    "tools_mentioned",
    "delivery_complexity_notes",
    "potential_quick_win",
]

RECOMMENDED_DEAL_ATTRS = [
    "opportunity_type",
    "problem_statement",
    "proposed_scope",
    "next_step",
    "next_step_date",
    "proposal_sent",
    "decision_notes",
]


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(errors="ignore").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def token() -> str:
    load_env_file(Path.home() / ".hermes" / ".env")
    tok = os.environ.get("ATTIO_API_KEY") or os.environ.get("ATTIO_ACCESS_TOKEN")
    if not tok:
        raise SystemExit("Missing ATTIO_API_KEY / ATTIO_ACCESS_TOKEN. Put it in ~/.hermes/.env or export it.")
    return tok


def request_json(path: str, *, method: str = "GET", body: Optional[dict] = None) -> dict:
    data = None if body is None else json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        BASE_URL + path,
        data=data,
        method=method,
        headers={
            "Authorization": "Bearer " + token(),
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        payload = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Attio API error {e.code} on {method} {path}: {payload[:500]}")


def first(values: dict, slug: str) -> Any:
    arr = values.get(slug) or []
    return arr[0] if arr else None


def value_text(item: Any) -> str:
    if not item:
        return ""
    if isinstance(item, str):
        return item
    if not isinstance(item, dict):
        return str(item)
    if "option" in item and item["option"]:
        return item["option"].get("title") or ""
    for k in ("value", "full_name", "email_address", "original_email_address", "title", "name"):
        if item.get(k) not in (None, ""):
            return str(item[k])
    return ""


def bool_value(item: Any) -> bool:
    if not item:
        return False
    if isinstance(item, bool):
        return item
    if isinstance(item, dict):
        return bool(item.get("value"))
    return bool(item)


def date_value(item: Any) -> Optional[dt.date]:
    s = value_text(item)
    if not s:
        return None
    try:
        return dt.date.fromisoformat(s[:10])
    except ValueError:
        return None


def fetch_list_entries(list_id: str = DAILY_DRIVER_LIST_ID) -> List[dict]:
    out: List[dict] = []
    offset = 0
    limit = 100
    while True:
        payload = request_json(f"/lists/{list_id}/entries/query", method="POST", body={"limit": limit, "offset": offset})
        batch = payload.get("data", [])
        out.extend(batch)
        if len(batch) < limit:
            break
        offset += limit
    return out


def fetch_record(object_slug: str, record_id: str) -> dict:
    return request_json(f"/objects/{object_slug}/records/{record_id}").get("data", {})


def fetch_attrs(resource: str) -> List[dict]:
    return request_json(resource).get("data", [])


def csv_count(path: Path) -> Tuple[bool, int, List[str]]:
    if not path.exists():
        return False, 0, []
    with path.open(newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        headers = list(reader.fieldnames or [])
        return True, sum(1 for _ in reader), headers


def entry_to_row(entry: dict, person_cache: dict) -> dict:
    vals = entry.get("entry_values", {})
    rid = entry.get("parent_record_id") or entry.get("record_id")
    person = person_cache.get(rid)
    if person is None:
        person = fetch_record("people", rid) if rid else {}
        person_cache[rid] = person
    pvals = person.get("values", {}) if person else {}
    name = value_text(first(pvals, "name")) or "Unknown"
    email = value_text(first(pvals, "email_addresses"))
    company_id = ""
    company_name = ""
    company_ref = first(pvals, "company")
    if isinstance(company_ref, dict):
        company_id = company_ref.get("target_record_id") or ""
    return {
        "entry_id": ((entry.get("id") or {}).get("entry_id") or ""),
        "record_id": rid or "",
        "name": name,
        "email": email,
        "company_id": company_id,
        "company": company_name,
        "status": value_text(first(vals, "cohevo_status")),
        "warmth": value_text(first(vals, "relationship_warmth")),
        "lead_type": value_text(first(vals, "lead_type")),
        "lead_source": value_text(first(vals, "lead_source")),
        "priority": value_text(first(vals, "priority")),
        "next_follow_up": date_value(first(vals, "next_follow_up")),
        "next_action": value_text(first(vals, "next_action")),
        "channel": value_text(first(vals, "outreach_channel")),
        "draft": value_text(first(vals, "draft_message")),
        "pain": value_text(first(vals, "pain_hypothesis")),
        "angle": value_text(first(vals, "best_outreach_angle")),
        "last_reply": value_text(first(vals, "last_reply_summary")),
        "do_not_contact": bool_value(first(vals, "do_not_contact")),
    }


def all_rows() -> List[dict]:
    cache: dict = {}
    return [entry_to_row(e, cache) for e in fetch_list_entries()]


def sort_key(row: dict) -> tuple:
    follow = row["next_follow_up"] or dt.date.max
    return (
        follow,
        PRIORITY_ORDER.get(row["priority"], 8),
        WARMTH_ORDER.get(row["warmth"], 8),
        row["name"].lower(),
    )


def summarize_person(row: dict, include_draft: bool = False) -> str:
    bits = [row["name"]]
    meta = []
    if row["status"]:
        meta.append(row["status"])
    if row["priority"]:
        meta.append(row["priority"])
    if row["warmth"]:
        meta.append(row["warmth"])
    if row["lead_type"]:
        meta.append(row["lead_type"])
    if meta:
        bits.append("(" + ", ".join(meta) + ")")
    if row["next_follow_up"]:
        bits.append(f"follow-up {row['next_follow_up'].isoformat()}")
    if row["next_action"]:
        bits.append("next: " + row["next_action"])
    elif row["angle"]:
        bits.append("angle: " + row["angle"])
    if include_draft and row["draft"]:
        bits.append("draft saved")
    return " - ".join(bits)


def norm_name(name: str) -> str:
    name = name.lower()
    name = re.sub(r"\([^)]*\)", " ", name)
    name = re.sub(r",.*$", " ", name)
    name = re.sub(r"[^a-z0-9]+", " ", name)
    return " ".join(name.split())


def guess_lead_type(track_or_segment: str) -> str:
    text = track_or_segment.lower()
    if "referral" in text or "partner" in text:
        return "Referral partner"
    if "peer" in text or "collabor" in text or "advisor" in text:
        return "Peer / collaborator"
    if "investor" in text:
        return "Investor / advisor"
    return "Direct client"


def build_import_candidates(limit: int) -> List[dict]:
    existing = {norm_name(r["name"]) for r in all_rows() if r.get("name") and r["name"] != "Unknown"}
    out: List[dict] = []
    seen = set(existing)

    def add(row: dict) -> None:
        name = (row.get("Name") or row.get("lead_name") or "").strip()
        if not name:
            return
        key = norm_name(name)
        if not key or key in seen:
            return
        seen.add(key)
        out.append(row)

    if DEEP_RESEARCH.exists():
        with DEEP_RESEARCH.open(newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                rank_raw = r.get("Rank", "99")
                rank = int(rank_raw) if str(rank_raw).isdigit() else 99
                mapped = {
                    "Name": r.get("Name", ""),
                    "Company": r.get("Company", ""),
                    "Position": r.get("Role", ""),
                    "LinkedIn URL": "",
                    "Email": "",
                    "Cohevo Status": "Ready to message" if r.get("Priority", "").lower().startswith("outreach") else "Research next",
                    "Relationship Warmth": "Warm",
                    "Lead Type": guess_lead_type(r.get("Outreach Track", "")),
                    "Lead Source": "LinkedIn",
                    "Priority": "High" if rank <= 8 else "Medium",
                    "Pain Hypothesis": r.get("Ops Pain Hypothesis", ""),
                    "Best Outreach Angle": r.get("Why Fit", ""),
                    "Next Action": r.get("Next Action", "Research and draft a casual message"),
                    "Personal Context": r.get("Personalization Hook", ""),
                    "Source File": str(DEEP_RESEARCH),
                }
                add(mapped)
                if len(out) >= limit:
                    return out

    if SCORED_LEADS.exists():
        with SCORED_LEADS.open(newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                try:
                    score = int(float(r.get("Fit Score") or 0))
                except ValueError:
                    score = 0
                if score < 55:
                    continue
                mapped = {
                    "Name": r.get("Name", ""),
                    "Company": r.get("Company", ""),
                    "Position": r.get("Position", ""),
                    "LinkedIn URL": r.get("URL", ""),
                    "Email": r.get("Email Address", ""),
                    "Cohevo Status": "Research next",
                    "Relationship Warmth": "Dormant warm" if r.get("Message Count") else "Light connection",
                    "Lead Type": guess_lead_type(r.get("Segment", "")),
                    "Lead Source": "LinkedIn",
                    "Priority": "High" if score >= 70 else "Medium",
                    "Pain Hypothesis": r.get("Likely Pain/Angle", ""),
                    "Best Outreach Angle": r.get("Personalization Hook", "") or r.get("Fit Reasons", ""),
                    "Next Action": "Research current context and decide outreach angle",
                    "Personal Context": r.get("Last Message Snippet", ""),
                    "Source File": str(SCORED_LEADS),
                }
                add(mapped)
                if len(out) >= limit:
                    return out
    return out


def cmd_morning(args: argparse.Namespace) -> None:
    today = dt.date.today()
    rows = [r for r in all_rows() if not r["do_not_contact"]]
    msg = sorted([r for r in rows if r["status"] in MESSAGE_STATUSES], key=sort_key)[:3]
    due = sorted([
        r for r in rows
        if r["next_follow_up"] and r["next_follow_up"] <= today and r["status"] not in FINAL_STATUSES
    ], key=sort_key)[:2]
    active = sorted([r for r in rows if r["status"] in CONVERSATION_STATUSES], key=sort_key)[:5]
    research = sorted([r for r in rows if r["status"] == "Research next"], key=sort_key)[:1]

    print("Cohevo morning")
    print(f"Date: {today.isoformat()}")
    print()
    print("Top 3 people to message:")
    for i, r in enumerate(msg, 1):
        print(f"{i}. {summarize_person(r, include_draft=True)}")
    if not msg:
        print("- No Ready to message / Message drafted people found.")
    print()
    print("Top follow-ups due:")
    for i, r in enumerate(due, 1):
        print(f"{i}. {summarize_person(r)}")
    if not due:
        print("- No overdue/today follow-ups found.")
    print()
    print("Active conversations:")
    for i, r in enumerate(active, 1):
        print(f"{i}. {summarize_person(r)}")
    if not active:
        print("- No active conversations found.")
    print()
    print("Research target:")
    for r in research:
        print("- " + summarize_person(r))
    if not research:
        print("- No Research next target found.")
    print()
    print("One Cohevo asset/action:")
    print("- Convert one call or real conversation into a short ops-audit checklist/template that can be reused in outreach.")


def cmd_wrap(args: argparse.Namespace) -> None:
    today = dt.date.today()
    tomorrow = today + dt.timedelta(days=1)
    rows = [r for r in all_rows() if not r["do_not_contact"]]
    counts: Dict[str, int] = {}
    for r in rows:
        counts[r["status"] or "Unspecified"] = counts.get(r["status"] or "Unspecified", 0) + 1
    print("Cohevo wrap snapshot")
    print(f"Date: {today.isoformat()}")
    print()
    print("Pipeline counts:")
    for status, n in sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])):
        print(f"- {status}: {n}")
    print()
    print("Due now / tomorrow:")
    due = sorted([r for r in rows if r["next_follow_up"] and r["next_follow_up"] <= tomorrow], key=sort_key)
    for r in due[:8]:
        print("- " + summarize_person(r))
    if not due:
        print("- Nothing due through tomorrow.")
    print()
    print("Needs cleanup before tomorrow:")
    missing_next = [r for r in rows if r["status"] in ACTIVE_STATUSES and not r["next_action"]]
    missing_follow = [r for r in rows if r["status"] in {"Follow-up due", "Call booked", "Proposal sent"} and not r["next_follow_up"]]
    print(f"- Active records missing next action: {len(missing_next)}")
    print(f"- Follow-up/call/proposal records missing date: {len(missing_follow)}")
    print()
    print("Tomorrow's best moves:")
    next_msgs = sorted([r for r in rows if r["status"] in MESSAGE_STATUSES], key=sort_key)[:2]
    for r in next_msgs:
        print("- Message: " + summarize_person(r, include_draft=True))
    next_research = sorted([r for r in rows if r["status"] == "Research next"], key=sort_key)[:1]
    for r in next_research:
        print("- Research: " + summarize_person(r))


def cmd_audit(args: argparse.Namespace) -> None:
    entries = fetch_list_entries()
    rows = all_rows()
    list_attrs = fetch_attrs(f"/lists/{DAILY_DRIVER_LIST_ID}/attributes")
    company_attrs = fetch_attrs("/objects/companies/attributes")
    deal_attrs = fetch_attrs("/objects/deals/attributes")
    list_slugs = {a.get("api_slug") for a in list_attrs}
    company_slugs = {a.get("api_slug") for a in company_attrs}
    deal_slugs = {a.get("api_slug") for a in deal_attrs}
    print("Cohevo Attio implementation audit")
    print()
    print(f"Daily Driver list ID: {DAILY_DRIVER_LIST_ID}")
    print(f"Entries: {len(entries)}")
    print(f"List attributes: {len(list_attrs)}")
    missing_list = [s for s in REQUIRED_LIST_ATTRS if s not in list_slugs]
    print("Missing core list attributes: " + (", ".join(missing_list) if missing_list else "none"))
    print()
    print("Company attributes still recommended/missing:")
    missing_company = [s for s in RECOMMENDED_COMPANY_ATTRS if s not in company_slugs]
    print("- " + (", ".join(missing_company) if missing_company else "none"))
    print("Deal attributes still recommended/missing:")
    missing_deal = [s for s in RECOMMENDED_DEAL_ATTRS if s not in deal_slugs]
    print("- " + (", ".join(missing_deal) if missing_deal else "none"))
    print()
    counts: Dict[str, int] = {}
    for r in rows:
        counts[r["status"] or "Unspecified"] = counts.get(r["status"] or "Unspecified", 0) + 1
    print("Status counts:")
    for status, n in sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])):
        print(f"- {status}: {n}")
    print()
    print("Data quality:")
    print(f"- Missing next action on active records: {sum(1 for r in rows if r['status'] in ACTIVE_STATUSES and not r['next_action'])}")
    print(f"- Missing follow-up date on call/proposal/follow-up records: {sum(1 for r in rows if r['status'] in {'Follow-up due','Call booked','Proposal sent'} and not r['next_follow_up'])}")
    print(f"- Ready/message records with saved draft: {sum(1 for r in rows if r['status'] in MESSAGE_STATUSES and r['draft'])}")
    print()
    print("Source files:")
    for path in [LINKEDIN_EXPORT, SCORED_LEADS, DEEP_RESEARCH]:
        exists, count, headers = csv_count(path)
        print(f"- {path}: {'exists' if exists else 'missing'}, rows={count}")


def cmd_update_plan(args: argparse.Namespace) -> None:
    text = " ".join(args.text).strip()
    if not text:
        raise SystemExit("Provide update text, e.g. update-plan 'Spoke to Ari, call booked Tuesday...'")
    lower = text.lower()
    guessed_status = ""
    if "booked" in lower or "calendar" in lower or "meeting" in lower or "call" in lower:
        guessed_status = "Call booked" if "book" in lower or "calendar" in lower or "meeting" in lower else "Call suggested"
    if "replied" in lower or "answered" in lower:
        guessed_status = guessed_status or "Replied"
    if "proposal" in lower:
        guessed_status = "Proposal sent" if "sent" in lower else "Proposal needed"
    print("Cohevo update plan (no CRM writes performed)")
    print()
    print("Raw update:")
    print(text)
    print()
    print("Suggested CRM change to confirm:")
    print(f"- Person: TODO resolve by exact name/email in Attio")
    print(f"- Status: {guessed_status or 'TODO infer from context'}")
    print("- Clean note: TODO summarize what happened in one short paragraph")
    print("- Next action: TODO concrete next step")
    print("- Next follow-up date: TODO date or leave blank if not due")
    print("- Draft response: TODO only if a reply is needed")
    print()
    print("Implementation rule:")
    print("- If this changes Attio, show the resolved person + exact fields first and get approval before writing.")


def cmd_import_candidates(args: argparse.Namespace) -> None:
    candidates = build_import_candidates(args.limit)
    if not candidates:
        print("No import candidates found after excluding existing Daily Driver names.")
        return
    fieldnames = [
        "Name",
        "Company",
        "Position",
        "LinkedIn URL",
        "Email",
        "Cohevo Status",
        "Relationship Warmth",
        "Lead Type",
        "Lead Source",
        "Priority",
        "Pain Hypothesis",
        "Best Outreach Angle",
        "Next Action",
        "Personal Context",
        "Source File",
    ]
    IMPORT_CANDIDATES.parent.mkdir(parents=True, exist_ok=True)
    with IMPORT_CANDIDATES.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for candidate in candidates:
            writer.writerow({k: candidate.get(k, "") for k in fieldnames})
    print(f"Wrote {len(candidates)} candidate rows to {IMPORT_CANDIDATES}")
    print("Top candidates:")
    for i, candidate in enumerate(candidates[:10], 1):
        print(
            f"{i}. {candidate.get('Name')} - {candidate.get('Company')} - "
            f"{candidate.get('Position')} - {candidate.get('Priority')} - "
            f"{candidate.get('Cohevo Status')}"
        )


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Cohevo Attio daily-driver helper")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("audit")
    sub.add_parser("morning")
    sub.add_parser("wrap")
    cand = sub.add_parser("import-candidates")
    cand.add_argument("--limit", type=int, default=25)
    up = sub.add_parser("update-plan")
    up.add_argument("text", nargs="*")
    args = parser.parse_args(argv)
    if args.command == "audit":
        cmd_audit(args)
    elif args.command == "morning":
        cmd_morning(args)
    elif args.command == "wrap":
        cmd_wrap(args)
    elif args.command == "import-candidates":
        cmd_import_candidates(args)
    elif args.command == "update-plan":
        cmd_update_plan(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
