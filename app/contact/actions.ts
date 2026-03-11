"use server";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

type Submission = {
  createdAt: string;
  name: string;
  email: string;
  company: string;
  teamSize: string;
  bottleneck: string;
  message: string;
  wantsChecklist: boolean;
};

function getStringValue(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function hasEmailConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM &&
      process.env.SMTP_TO,
  );
}

function hasHubSpotConfig() {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN);
}

async function writeSubmissionToFile(submission: Submission) {
  const isVercel = Boolean(process.env.VERCEL);
  const dataDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "contact-submissions.json");

  await mkdir(dataDir, { recursive: true });

  let existing: Submission[] = [];

  try {
    const content = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }

  existing.push(submission);
  await writeFile(filePath, `${JSON.stringify(existing, null, 2)}\n`, "utf-8");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmailSubmission(submission: Submission) {
  const port = Number(process.env.SMTP_PORT);
  const secure = Number.isFinite(port) && port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const textBody = [
    "New contact form submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Team size: ${submission.teamSize}`,
    `Biggest bottleneck: ${submission.bottleneck}`,
    `Checklist requested: ${submission.wantsChecklist ? "Yes" : "No"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const htmlBody = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(submission.company)}</p>
    <p><strong>Team size:</strong> ${escapeHtml(submission.teamSize)}</p>
    <p><strong>Biggest bottleneck:</strong> ${escapeHtml(submission.bottleneck)}</p>
    <p><strong>Checklist requested:</strong> ${submission.wantsChecklist ? "Yes" : "No"}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(submission.message).replaceAll("\n", "<br />")}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    replyTo: submission.email,
    subject: `New inquiry from ${submission.name}`,
    text: textBody,
    html: htmlBody,
  });
}

function splitName(fullName: string) {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function addHubSpotProperty(
  properties: Record<string, string>,
  propertyName: string | undefined,
  value: string,
) {
  if (!propertyName || !value || value === "Not provided") {
    return;
  }

  properties[propertyName] = value;
}

async function sendHubSpotLead(submission: Submission) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    return;
  }

  const { firstName, lastName } = splitName(submission.name);
  const properties: Record<string, string> = {
    email: submission.email,
    lifecyclestage: "lead",
  };

  if (firstName) {
    properties.firstname = firstName;
  }

  if (lastName) {
    properties.lastname = lastName;
  }

  if (submission.company !== "Not provided") {
    properties.company = submission.company;
  }

  addHubSpotProperty(properties, process.env.HUBSPOT_TEAM_SIZE_PROPERTY, submission.teamSize);
  addHubSpotProperty(properties, process.env.HUBSPOT_BOTTLENECK_PROPERTY, submission.bottleneck);
  addHubSpotProperty(properties, process.env.HUBSPOT_MESSAGE_PROPERTY, submission.message);
  addHubSpotProperty(
    properties,
    process.env.HUBSPOT_CHECKLIST_PROPERTY,
    submission.wantsChecklist ? "true" : "false",
  );

  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: [
        {
          idProperty: "email",
          id: submission.email,
          properties,
        },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`HubSpot contact upsert failed (${response.status}): ${details}`);
  }
}

export async function submitContactForm(formData: FormData) {
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const company = getStringValue(formData, "company");
  const teamSize = getStringValue(formData, "teamSize");
  const bottleneck = getStringValue(formData, "bottleneck");
  const message = getStringValue(formData, "message");
  const wantsChecklist = formData.get("checklist") === "on";

  if (!name || !email) {
    redirect("/contact?error=missing-fields");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    redirect("/contact?error=invalid-email");
  }

  const submission: Submission = {
    createdAt: new Date().toISOString(),
    name,
    email,
    company: company || "Not provided",
    teamSize: teamSize || "Not provided",
    bottleneck: bottleneck || "Not provided",
    message: message || "Not provided",
    wantsChecklist,
  };

  const emailConfigured = hasEmailConfig();
  const hubSpotConfigured = hasHubSpotConfig();

  if (!emailConfigured && !hubSpotConfigured) {
    await writeSubmissionToFile(submission);
  } else {
    try {
      await Promise.all([
        emailConfigured ? sendEmailSubmission(submission) : Promise.resolve(),
        hubSpotConfigured ? sendHubSpotLead(submission) : Promise.resolve(),
      ]);
    } catch (error) {
      console.error("Failed to deliver contact submission.", error);
      await writeSubmissionToFile(submission);
      redirect("/contact?error=delivery-failed");
    }
  }

  const query = wantsChecklist ? "?checklist=1" : "";
  redirect(`/thank-you${query}`);
}
