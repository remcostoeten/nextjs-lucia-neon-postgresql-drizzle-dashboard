import { getUserProfile } from "@/lib/actions/users";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import UserSettings from "./_components/UserSettings";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const userProfile = await getUserProfile(session.user.id);

  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} userProfile={userProfile} />
      </div>
    </main>
  );
}
