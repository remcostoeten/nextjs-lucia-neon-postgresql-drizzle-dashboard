"use client";
import { AuthSession } from "@/lib/auth/utils";
import UpdateEmailCard from "./UpdateEmailCard";
import UpdateNameCard from "./UpdateNameCard";
import UpdateProfileCard from "./update-profile-card";

export default function UserSettings({
  session,
  userProfile,
}: {
  session: AuthSession["session"];
  userProfile: any; // Replace 'any' with the actual type of userProfile
}) {
  return (
    <>
      <UpdateNameCard name={session?.user.name ?? ""} />
      <UpdateEmailCard email={session?.user.email ?? ""} />
      <UpdateProfileCard userProfile={userProfile} />
    </>
  );
}
