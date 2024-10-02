'use server'

import { db } from '@/lib/db'
import { savedLocations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function deleteLocation(id: string) {
    try {
        await db.delete(savedLocations).where(eq(savedLocations.id, id))
        return true
    } catch (error) {
        console.error('Error deleting location:', error)
        throw new Error('Failed to delete location')
    }
}
