import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { onboardingInfo, onboardingInfoSchema } from "@/lib/db/schema/onboarding";
import { eq } from "drizzle-orm";
import { ActionResult } from "next/dist/server/app-render/types";

export async function updateOnboardingInfo(
    _: any,
    formData: FormData
): Promise<ActionResult & { success?: boolean }> {
    const { session } = await getUserAuth();
    if (!session) return { error: "Unauthorized" };

    const result = onboardingInfoSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        const error = result.error.flatten().fieldErrors;
        return { error: "Invalid data: " + JSON.stringify(error) };
    }

    try {
        await db
            .update(onboardingInfo)
            .set({
                ...result.data,
                dateOfBirth: result.data.dateOfBirth ? result.data.dateOfBirth.toISOString() : null,
            })
            .where(eq(onboardingInfo.userId, session.user.id));

        return { success: true, error: "" };
    } catch (e) {
        return { error: "An error occurred while updating onboarding information" };
    }
}
