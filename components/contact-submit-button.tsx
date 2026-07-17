"use client";

import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";

export function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rescue-form-submit"
      disabled={pending}
      aria-disabled={pending}
    >
      <span>{pending ? "Sending…" : "Send message"}</span>
      <ArrowRight aria-hidden="true" />
    </button>
  );
}
