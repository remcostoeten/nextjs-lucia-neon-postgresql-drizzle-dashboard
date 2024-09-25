"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { updateUser } from "@/core/lib/actions/users";
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function UpdateNameCard({ name }: { name: string }) {
  const [state, formAction] = useFormState(updateUser, {
    error: "",
  });

  useEffect(() => {
    if (state.success == true) toast.success("Updated User");
    if (state.error) toast.error("Error", { description: state.error });
  }, [state]);

  return (
    <AccountCard
      params={{
        header: "Your Name",
        description:
          "Please enter your full name, or a display name you are comfortable with.",
      }}
    >
      <form action={formAction}>
        <AccountCardBody>
          <Input defaultValue={name ?? ""} name="name" />
        </AccountCardBody>
        <AccountCardFooter description="64 characters maximum">
          <Submit />
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>Update Name</Button>;
};
