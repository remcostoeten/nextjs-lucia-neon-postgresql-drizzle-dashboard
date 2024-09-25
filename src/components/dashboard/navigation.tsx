import { getUserAuth } from "@/lib/auth/utils";
import NavigationClient from "./navigation.client";

export default async function Navigation() {
  const { session } = await getUserAuth();

  if (!session) {
    return null;
  }

  return (
    <NavigationClient
      userName={session.user.name || ""}
      userEmail={session.user.email || ""}
    />
  );
}
