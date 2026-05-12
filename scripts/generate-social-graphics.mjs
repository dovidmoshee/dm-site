import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outRoot = path.join(
  root,
  "business-assets",
  "05-marketing",
  "social-graphics",
  "ai-systems"
);

const brand = {
  bg: "#f4f8ef",
  bgAlt: "#e8efde",
  ink: "#0f150f",
  ink2: "#2a3627",
  ink3: "#586652",
  lime: "#c8ff00",
  green: "#4a7a00",
  dark: "#0c130d",
};

const storySets = [
  {
    slug: "set-1-problem-led",
    label: "Instagram Stories / Problem-Led",
    frames: [
      { kicker: "01", title: "Most teams do not need another AI tool." },
      { kicker: "02", title: "They need a cleaner operating system." },
      {
        kicker: "03",
        title: "Because AI does not fix broken workflows.",
        body: "It speeds them up.",
      },
      {
        kicker: "04",
        title: "Messy handoffs become faster messy handoffs.",
        body: "Scattered data becomes faster scattered reporting.",
      },
      {
        kicker: "05",
        title: "The better order:",
        list: ["Map the workflow.", "Define the owner.", "Clean the data.", "Then automate."],
      },
      {
        kicker: "06",
        title: "AI works when the system underneath it is already clear.",
      },
      {
        kicker: "07",
        title: "Before you buy another tool, fix the workflow it will run on.",
        cta: "Book a free audit call",
        url: "cohevo.com/contact",
      },
    ],
  },
  {
    slug: "set-2-founder-pain",
    label: "Instagram Stories / Founder Pain",
    frames: [
      { kicker: "01", title: "Your business is not messy because you chose the wrong app." },
      { kicker: "02", title: "It is messy because the process lives in people's heads." },
      {
        kicker: "03",
        title: "Sales handoff in Slack.",
        list: ["Delivery brief in a doc.", "Pipeline update in someone's memory."],
      },
      {
        kicker: "04",
        title: "Then AI gets added on top.",
        body: "Now the mess moves faster.",
      },
      { kicker: "05", title: "This is why AI ROI usually starts before AI." },
      {
        kicker: "06",
        title: "The foundation:",
        list: ["One workflow.", "One owner.", "One source of truth.", "One clean handoff."],
      },
      {
        kicker: "07",
        title: "Cohevo installs that operating layer in 60 days.",
        cta: "Get the systems checklist",
        url: "cohevo.com/contact#checklist",
      },
    ],
  },
  {
    slug: "set-3-checklist",
    label: "Instagram Stories / Checklist",
    frames: [
      { kicker: "01", title: "Before adding AI, check the system." },
      { kicker: "02", title: "Can your team explain every pipeline stage?", body: "Yes / No" },
      { kicker: "03", title: "Does every handoff have a clear owner?", body: "Yes / No" },
      {
        kicker: "04",
        title: "Does your reporting pull from one source of truth?",
        body: "Yes / No",
      },
      { kicker: "05", title: "Is your onboarding process documented?", body: "Yes / No" },
      {
        kicker: "06",
        title: "If the answer is no, AI will not solve it.",
        body: "It will amplify it.",
      },
      {
        kicker: "07",
        title: "Clean the workflow first.",
        list: ["Then automate.", "Then add AI where it actually saves time."],
        cta: "Book a free audit call",
        url: "cohevo.com/contact",
      },
    ],
  },
];

const whatsAppSets = [
  {
    slug: "set-1-direct",
    label: "WhatsApp Status / Direct",
    frames: [
      { kicker: "01", title: "Most small teams do not have an AI problem.", body: "They have a systems problem." },
      {
        kicker: "02",
        title: "If handoffs are unclear, reporting is manual, and data is scattered, AI will not magically clean it up.",
      },
      {
        kicker: "03",
        title: "AI gives you leverage on what already exists.",
        list: ["Clean system = faster execution.", "Messy system = louder mess."],
      },
      {
        kicker: "04",
        title: "The right sequence:",
        list: ["Map the workflow.", "Define handoffs.", "Clean the data.", "Automate.", "Then layer in AI."],
      },
      {
        kicker: "05",
        title: "That is what Cohevo builds in 60 days.",
        cta: "Free audit call",
        url: "cohevo.com/contact",
      },
    ],
  },
  {
    slug: "set-2-short-teaser",
    label: "WhatsApp Status / Short Teaser",
    frames: [
      { kicker: "01", title: "Before buying another AI tool, ask:", body: "Is the workflow underneath it actually clear?" },
      { kicker: "02", title: "Tools inherit your process.", body: "If the process is broken, the tool will expose it faster." },
      { kicker: "03", title: "Fix the operating system first.", body: "Then automate what is worth automating." },
      {
        kicker: "04",
        title: "I wrote about this here:",
        url: "cohevo.com/blog/your-team-doesnt-need-more-ai-tools",
      },
    ],
  },
  {
    slug: "set-3-mini-checklist",
    label: "WhatsApp Status / Mini Checklist",
    frames: [
      {
        kicker: "01",
        title: "Quick systems check:",
        body: "Can your team see pipeline, delivery status, and customer ownership in one place?",
      },
      { kicker: "02", title: "Does every handoff have a named owner and a clear next step?" },
      { kicker: "03", title: "Is weekly reporting automatic, or is someone still rebuilding it manually?" },
      {
        kicker: "04",
        title: "If these are unclear, start there before adding AI.",
        cta: "Need a clean map?",
        url: "cohevo.com/contact",
      },
    ],
  },
];

const linkedIn = [
  {
    kicker: "01",
    title: "Your team does not need more AI tools.",
    body: "It needs a better operating system.",
  },
  {
    kicker: "02",
    title: "Every week, another AI tool promises to fix the business.",
    list: ["Smarter email.", "Automated follow-up.", "Instant reports."],
  },
  {
    kicker: "03",
    title: "But tools do not fix broken workflows.",
    body: "They inherit them.",
  },
  {
    kicker: "04",
    title: "If your handoff is inconsistent, AI creates inconsistent handoffs faster.",
    body: "If your data is scattered, AI surfaces scattered insights faster.",
  },
  {
    kicker: "05",
    title: "AI amplifies what is already there.",
    body: "Before you add it, build something worth amplifying.",
  },
  {
    kicker: "06",
    title: "A small-team operating system means:",
    list: ["Clear owners.", "Defined handoffs.", "One source of truth.", "Clean reporting inputs."],
  },
  {
    kicker: "07",
    title: "The sequence that works:",
    list: ["Map the workflow.", "Simplify the process.", "Connect the tools.", "Then layer in AI."],
  },
  {
    kicker: "08",
    title: "The teams seeing real AI ROI are not always the earliest adopters.",
    body: "They are the ones with clean operations first.",
    cta: "Build the foundation before you automate it.",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapLines(text, maxChars) {
  return String(text)
    .split("\n")
    .flatMap((part) => {
      const words = part.trim().split(/\s+/).filter(Boolean);
      const lines = [];
      let current = "";

      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxChars && current) {
          lines.push(current);
          current = word;
        } else {
          current = next;
        }
      }

      if (current) lines.push(current);
      return lines.length ? lines : [""];
    });
}

function textBlock({
  text,
  x,
  y,
  maxChars,
  size,
  lineHeight,
  weight = 700,
  fill = brand.ink,
  anchor = "start",
}) {
  const lines = wrapLines(text, maxChars);
  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="${x}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  return {
    svg: `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Instrument Sans, Arial, sans-serif" font-size="${size}" line-height="${lineHeight}" font-weight="${weight}" fill="${fill}">${tspans}</text>`,
    height: Math.max(lines.length, 1) * lineHeight,
    lines,
  };
}

function listBlock({ items, x, y, maxChars, size, lineHeight, fill = brand.ink2 }) {
  let currentY = y;
  const parts = [];

  for (const item of items ?? []) {
    parts.push(`<circle cx="${x + 12}" cy="${currentY - size * 0.32}" r="8" fill="${brand.lime}" />`);
    const block = textBlock({
      text: item,
      x: x + 42,
      y: currentY,
      maxChars,
      size,
      lineHeight,
      weight: 650,
      fill,
    });
    parts.push(block.svg);
    currentY += block.height + 20;
  }

  return { svg: parts.join(""), height: currentY - y };
}

function layoutAccents(width, height, variant) {
  const top = variant % 3;
  const dotRows = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => {
      const cx = width - 180 + col * 32;
      const cy = 170 + row * 32;
      return `<circle cx="${cx}" cy="${cy}" r="4" fill="${brand.ink}" opacity="0.12" />`;
    }).join("")
  ).join("");

  const ribbon =
    top === 0
      ? `<rect x="${width - 168}" y="0" width="82" height="${height}" fill="${brand.lime}" opacity="0.82" />`
      : top === 1
        ? `<path d="M0 ${height - 280} C ${width * 0.35} ${height - 430}, ${width * 0.65} ${height - 40}, ${width} ${height - 190}" fill="none" stroke="${brand.lime}" stroke-width="52" stroke-linecap="round" opacity="0.92" />`
        : `<circle cx="${width - 110}" cy="${height - 130}" r="210" fill="${brand.lime}" opacity="0.88" />`;

  return `
    <rect width="${width}" height="${height}" fill="${brand.bg}" />
    <rect x="0" y="0" width="${width}" height="22" fill="${brand.dark}" />
    ${ribbon}
    ${dotRows}
  `;
}

function renderFrame({ width, height, frame, label, variant = 0, maxChars }) {
  const margin = width >= 1080 && height > width ? 92 : 78;
  const isPortraitStory = height === 1920;
  const titleSize = isPortraitStory ? 78 : 66;
  const bodySize = isPortraitStory ? 42 : 38;
  const titleLine = isPortraitStory ? 92 : 78;
  const bodyLine = isPortraitStory ? 58 : 52;

  let y = isPortraitStory ? 360 : 292;
  const parts = [layoutAccents(width, height, variant)];

  parts.push(`<text x="${margin}" y="${isPortraitStory ? 128 : 104}" font-family="DM Mono, monospace" font-size="24" letter-spacing="2" font-weight="700" fill="${brand.ink3}">${escapeXml(label.toUpperCase())}</text>`);
  parts.push(`<rect x="${margin}" y="${isPortraitStory ? 168 : 140}" width="96" height="42" rx="21" fill="${brand.dark}" />`);
  parts.push(`<text x="${margin + 48}" y="${isPortraitStory ? 197 : 168}" text-anchor="middle" font-family="DM Mono, monospace" font-size="22" font-weight="700" fill="${brand.lime}">${escapeXml(frame.kicker)}</text>`);

  const title = textBlock({
    text: frame.title,
    x: margin,
    y,
    maxChars,
    size: titleSize,
    lineHeight: titleLine,
    weight: 780,
    fill: brand.ink,
  });
  parts.push(title.svg);
  y += title.height + 46;

  if (frame.body) {
    const body = textBlock({
      text: frame.body,
      x: margin,
      y,
      maxChars: maxChars + 8,
      size: bodySize,
      lineHeight: bodyLine,
      weight: 560,
      fill: brand.ink2,
    });
    parts.push(body.svg);
    y += body.height + 42;
  }

  if (frame.list) {
    const list = listBlock({
      items: frame.list,
      x: margin,
      y,
      maxChars: maxChars + 3,
      size: bodySize,
      lineHeight: bodyLine,
    });
    parts.push(list.svg);
    y += list.height + 36;
  }

  if (frame.cta || frame.url) {
    const boxHeight = frame.cta && frame.url ? 174 : 112;
    const boxY = height - margin - boxHeight - 82;
    parts.push(`<rect x="${margin}" y="${boxY}" width="${width - margin * 2}" height="${boxHeight}" rx="26" fill="${brand.dark}" />`);
    if (frame.cta) {
      parts.push(`<text x="${margin + 44}" y="${boxY + 64}" font-family="Instrument Sans, Arial, sans-serif" font-size="${bodySize * 0.9}" font-weight="760" fill="${brand.bg}">${escapeXml(frame.cta)}</text>`);
    }
    if (frame.url) {
      parts.push(`<text x="${margin + 44}" y="${boxY + (frame.cta ? 122 : 68)}" font-family="DM Mono, monospace" font-size="${bodySize * 0.62}" font-weight="700" fill="${brand.lime}">${escapeXml(frame.url)}</text>`);
    }
  }

  parts.push(`<text x="${margin}" y="${height - 76}" font-family="Instrument Sans, Arial, sans-serif" font-size="30" font-weight="780" fill="${brand.ink}">Cohevo</text>`);
  parts.push(`<text x="${width - margin}" y="${height - 76}" text-anchor="end" font-family="DM Mono, monospace" font-size="20" font-weight="700" fill="${brand.ink3}">cohevo.com</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${parts.join("")}</svg>`;
}

async function writePng(filePath, svg) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(filePath);
}

async function generate() {
  await fs.rm(outRoot, { recursive: true, force: true });

  for (const set of storySets) {
    for (const [index, frame] of set.frames.entries()) {
      const svg = renderFrame({
        width: 1080,
        height: 1920,
        frame,
        label: set.label,
        variant: index,
        maxChars: 18,
      });
      await writePng(
        path.join(outRoot, "instagram-stories", set.slug, `${String(index + 1).padStart(2, "0")}.png`),
        svg
      );
    }
  }

  for (const set of whatsAppSets) {
    for (const [index, frame] of set.frames.entries()) {
      const svg = renderFrame({
        width: 1080,
        height: 1920,
        frame,
        label: set.label,
        variant: index + 1,
        maxChars: 18,
      });
      await writePng(
        path.join(outRoot, "whatsapp-status", set.slug, `${String(index + 1).padStart(2, "0")}.png`),
        svg
      );
    }
  }

  for (const [index, frame] of linkedIn.entries()) {
    const svg = renderFrame({
      width: 1080,
      height: 1350,
      frame,
      label: "LinkedIn Carousel",
      variant: index + 2,
      maxChars: 22,
    });
    await writePng(
      path.join(outRoot, "linkedin-carousel", `${String(index + 1).padStart(2, "0")}.png`),
      svg
    );
  }
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
