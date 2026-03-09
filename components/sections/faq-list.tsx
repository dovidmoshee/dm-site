"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: readonly FaqItem[];
  className?: string;
};

export function FaqList({ items, className }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`faq-list ${className ?? ""}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const questionId = `faq-question-${index + 1}`;
        const answerId = `faq-answer-${index + 1}`;

        return (
          <div key={item.question} className={`faq-item ${isOpen ? "open" : ""}`.trim()}>
            <button
              id={questionId}
              className="faq-q"
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              aria-controls={answerId}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </button>
            <div id={answerId} className="faq-a" role="region" aria-labelledby={questionId} hidden={!isOpen}>
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
