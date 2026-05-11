"use server";

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

const defaultSmtpHost = "smtp.gmail.com";
const defaultSmtpPort = 587;
const defaultContactSender = "Cohevo <hi@cohevo.co>";
const defaultContactRecipient = "david@cohevo.co";

function getSmtpPort() {
  const rawPort = process.env.SMTP_PORT?.trim();
  if (!rawPort) {
    return defaultSmtpPort;
  }

  const configuredPort = Number(rawPort);
  return Number.isFinite(configuredPort) ? configuredPort : defaultSmtpPort;
}

function getEmailConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return {
    host: process.env.SMTP_HOST?.trim() || defaultSmtpHost,
    port: getSmtpPort(),
    user,
    pass,
    from: process.env.SMTP_FROM?.trim() || defaultContactSender,
    to: process.env.SMTP_TO?.trim() || defaultContactRecipient,
  };
}

function hasEmailConfig() {
  return Boolean(getEmailConfig());
}

function hasAttioConfig() {
  return Boolean(process.env.ATTIO_ACCESS_TOKEN);
}

function shouldUseFileFallback() {
  return process.env.NODE_ENV !== "production" && !process.env.VERCEL;
}

function shouldUseFileFallback() {
  return process.env.NODE_ENV !== "production" && !process.env.VERCEL;
}

async function writeSubmissionToFile(submission: Submission): Promise<boolean> {
  try {
    const [{ mkdir, readFile, writeFile }, pathModule] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);

    const isVercel = Boolean(process.env.VERCEL);
    const dataDir = isVercel ? "/tmp" : pathModule.join(process.cwd(), "data");
    const filePath = pathModule.join(dataDir, "contact-submissions.json");

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
    return true;
  } catch (error) {
    console.error("Failed to persist contact submission to file fallback.", error);
    return false;
  }
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
  const emailConfig = getEmailConfig();
  if (!emailConfig) {
    return;
  }

  const nodemailer = (await import("nodemailer")).default;
  const secure = emailConfig.port === 465;

  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure,
    requireTLS: !secure,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
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
    from: emailConfig.from,
    to: emailConfig.to,
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

function buildSubmissionSummary(submission: Submission) {
  return [
    "Contact form submission from cohevo.co",
    "",
    `Submitted at: ${submission.createdAt}`,
    `Company: ${submission.company}`,
    `Team size: ${submission.teamSize}`,
    `Biggest bottleneck: ${submission.bottleneck}`,
    `Checklist requested: ${submission.wantsChecklist ? "Yes" : "No"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

function addAttioAttribute(
  values: Record<string, unknown>,
  attributeName: string | undefined,
  value: string | boolean,
) {
  if (!attributeName || value === "" || value === "Not provided") {
    return;
  }

  values[attributeName] = value;
}

async function sendAttioLead(submission: Submission) {
  const accessToken = process.env.ATTIO_ACCESS_TOKEN;
  if (!accessToken) {
    return;
  }

  const { firstName, lastName } = splitName(submission.name);
  const values: Record<string, unknown> = {
    email_addresses: [submission.email],
    name: [
      {
        first_name: firstName,
        last_name: lastName,
        full_name: submission.name,
      },
    ],
    description: buildSubmissionSummary(submission),
  };

  addAttioAttribute(values, process.env.ATTIO_COMPANY_ATTRIBUTE, submission.company);
  addAttioAttribute(values, process.env.ATTIO_TEAM_SIZE_ATTRIBUTE, submission.teamSize);
  addAttioAttribute(values, process.env.ATTIO_BOTTLENECK_ATTRIBUTE, submission.bottleneck);
  addAttioAttribute(values, process.env.ATTIO_MESSAGE_ATTRIBUTE, submission.message);
  addAttioAttribute(values, process.env.ATTIO_CHECKLIST_ATTRIBUTE, submission.wantsChecklist);
  addAttioAttribute(values, process.env.ATTIO_SOURCE_ATTRIBUTE, "Website contact form");

  const response = await fetch(
    "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          values,
        },
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Attio person upsert failed (${response.status}): ${details}`);
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
  const attioConfigured = hasAttioConfig();

  if (!emailConfigured && !attioConfigured) {
    if (!shouldUseFileFallback()) {
      console.error(
        "Contact form delivery is not configured. Set SMTP_USER and SMTP_PASS, or configure Attio.",
      );
      redirect("/contact?error=delivery-failed");
    }

  if (!emailConfigured && !hubSpotConfigured) {
    if (!shouldUseFileFallback()) {
      console.error(
        "Contact form delivery is not configured. Set SMTP_USER and SMTP_PASS, or configure HubSpot.",
      );
      redirect("/contact?error=delivery-failed");
    }

    const persisted = await writeSubmissionToFile(submission);
    if (!persisted) {
      redirect("/contact?error=delivery-failed");
    }
  } else {
    const deliveryTasks: Promise<void>[] = [];

    if (emailConfigured) {
      deliveryTasks.push(sendEmailSubmission(submission));
    }

    if (attioConfigured) {
      deliveryTasks.push(sendAttioLead(submission));
    }

    const deliveries = await Promise.allSettled(deliveryTasks);
    const successfulDeliveries = deliveries.filter((result) => result.status === "fulfilled").length;

    if (successfulDeliveries === 0) {
      console.error("Failed to deliver contact submission.", deliveries);
      const persisted = await writeSubmissionToFile(submission);
      if (!persisted) {
        redirect("/contact?error=delivery-failed");
      }

      redirect("/contact?error=delivery-failed");
    }

    for (const result of deliveries) {
      if (result.status === "rejected") {
        console.error("A delivery channel failed for contact submission.", result.reason);
      }
    }

    if (successfulDeliveries > 0) {
      const failedDeliveries = deliveries.length - successfulDeliveries;
      if (failedDeliveries > 0) {
        // Persist a copy for troubleshooting when one channel fails.
        await writeSubmissionToFile(submission);
      }
    }
  }

  const query = wantsChecklist ? "?checklist=1" : "";
  redirect(`/thank-you${query}`);
}
