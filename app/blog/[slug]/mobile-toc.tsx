"use client";

import { useState } from "react";

import type { TocEntry } from "@/lib/toc";

export function MobileTOC({ entries }: { entries: TocEntry[] }) {
  const [open, setOpen] = useState(false);

  if (entries.length < 2) return null;

  return (
    <div className={`mobile-toc${open ? " mobile-toc-open" : ""}`}>
      <button
        className="mobile-toc-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-toc-panel"
      >
        <span className="mobile-toc-trigger-label">
          <span className="mobile-toc-icon">≡</span>
          On this page
        </span>
        <span className="mobile-toc-chevron" aria-hidden="true">
          ↓
        </span>
      </button>

      <div
        id="mobile-toc-panel"
        className="mobile-toc-body"
        role="navigation"
        aria-label="Table of contents"
      >
        <ul className="mobile-toc-list">
          {entries.map(({ id, text, level }) => (
            <li key={id} className={`mobile-toc-item mobile-toc-level-${level}`}>
              <a
                href={`#${id}`}
                className="mobile-toc-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  setOpen(false);
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
