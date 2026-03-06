"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label?: string;
  pendingLabel?: string;
};

export function SubmitButton({
  label = "Send Message",
  pendingLabel = "Sending...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full rounded-full sm:w-auto" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
