import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  try {
    const { session } = await getUserAuth();
    console.log("Session:", session);

    if (!session) {
      console.log("Session is null or undefined");
    }

    return (
      <main className="">
        <h1 className="text-2xl font-bold my-2">Profile</h1>
        <pre className="bg-secondary p-4 rounded-lg my-2">
          {JSON.stringify(session, null, 2)}
        </pre>

        <SignOutBtn />
      </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return <div>Error loading profile</div>;
  }
}
