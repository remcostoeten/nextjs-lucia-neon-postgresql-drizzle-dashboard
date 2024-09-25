import { lucia } from "@/lib/auth/lucia";
import { genericError, setAuthCookie, validateAuthFormData } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { onboardingInfo } from "@/lib/db/schema/onboarding";
import { generateId } from "lucia";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function signUpAction(
    _: ActionResult,
    formData: FormData,
): Promise<ActionResult> {
    const { data, error } = validateAuthFormData(formData);

    if (error !== null) return { error };

    const hashedPassword = await new Argon2id().hash(data.password);
    const userId = generateId(15);

    try {
        await db.transaction(async (tx) => {
            await tx.insert(users).values({
                id: userId,
                email: data.email,
                hashedPassword,
            });

            await tx.insert(onboardingInfo).values({
                id: generateId(15),
                userId: userId,
                onboardingCompleted: false,
            });
        });
    } catch (e) {
        return genericError;
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setAuthCookie(sessionCookie);
    return redirect("/onboarding");
}
