"use client";

import { useEffect, useRef, useState } from "react";

import type { TocEntry } from "@/lib/toc";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const { id } of entries) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <aside className="toc-sidebar">
      <nav aria-label="Table of contents">
        <p className="toc-label">On this page</p>
        <ul className="toc-list">
          {entries.map(({ id, text, level }) => (
            <li key={id} className={`toc-item toc-level-${level}`}>
              <a
                href={`#${id}`}
                className={`toc-link${activeId === id ? " toc-link-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(id);
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
