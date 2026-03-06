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

export async function submitContactForm(formData: FormData) {
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const company = getStringValue(formData, "company");
  const teamSize = getStringValue(formData, "teamSize");
  const bottleneck = getStringValue(formData, "bottleneck");
  const message = getStringValue(formData, "message");
  const wantsChecklist = formData.get("checklist") === "on";

  if (!name || !email || !company || !teamSize || !bottleneck || !message) {
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
    company,
    teamSize,
    bottleneck,
    message,
    wantsChecklist,
  };

  if (hasEmailConfig()) {
    await sendEmailSubmission(submission);
  } else {
    await writeSubmissionToFile(submission);
  }

  const query = wantsChecklist ? "?checklist=1" : "";
  redirect(`/thank-you${query}`);
}
