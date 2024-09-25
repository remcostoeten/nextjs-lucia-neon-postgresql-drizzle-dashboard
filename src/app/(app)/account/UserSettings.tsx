"use client";
import { AuthSession } from "@/core/lib/auth/utils";
import UpdateEmailCard from "./UpdateEmailCard";
import UpdateNameCard from "./UpdateNameCard";

export default function UserSettings({
  session,
}: {
  session: AuthSession["session"];
}) {
  return (
    <>
      <UpdateNameCard name={session?.user.name ?? ""} />
      <UpdateEmailCard email={session?.user.email ?? ""} />
    </>
  );
}
