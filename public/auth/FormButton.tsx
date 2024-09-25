"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function FormButton({
  variant = "outline",
  pendingText,
  defaultText,
  isPending,
}: {
  variant: "outline" | "default";
  pendingText: string;
  defaultText: string;
  isPending?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} type="submit" disabled={pending || isPending}>
      {pending || isPending ? pendingText : defaultText}
    </Button>
  );
}
