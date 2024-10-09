import { getUserAuth } from "@/lib/auth/utils"
import { db } from "db"
import { eq } from "drizzle-orm"
import { parsedOutputs } from "schema"

export async function fetchParsedOutputs() {
    const { session } = await getUserAuth()
    if (!session) {
        return { error: 'Unauthorized', success: false, data: null }
    }

    try {
        const outputs = await db
            .select()
            .from(parsedOutputs)
            .where(eq(parsedOutputs.userId, session.user.id))
        return { success: true, error: '', data: outputs }
    } catch (e) {
        console.error('Failed to fetch parsed outputs:', e)
        return {
            error: 'Failed to fetch parsed outputs',
            success: false,
            data: null
        }
    }
}
