"use client";

import { signOutAction } from "@/core/lib/actions/users";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SignOutBtn() {
  return (
    <form action={signOutAction} className="w-full text-left">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={"destructive"}>
      Sign{pending ? "ing" : ""} out
    </Button>
  );
};
