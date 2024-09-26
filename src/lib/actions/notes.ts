'use server'

import { db } from '@/lib/db';
import { insertNoteSchema, notes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getNotes(folderId: string) {
    try {
        const result = await db.select().from(notes).where(eq(notes.folderId, folderId));
        return { notes: result };
    } catch (error) {
        console.error('Failed to fetch notes:', error);
        return { error: 'Failed to fetch notes' };
    }
}

export async function createNote(data: FormData) {
    const result = insertNoteSchema.safeParse(Object.fromEntries(data));

    if (!result.success) {
        return { error: 'Invalid note data' };
    }

    try {
        await db.insert(notes).values(result.data);
        revalidatePath('/folders');
        return { success: true };
    } catch (error) {
        console.error('Failed to create note:', error);
        return { error: 'Failed to create note' };
    }
}

export async function deleteNote(id: string) {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        revalidatePath('/folders');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete note:', error);
        return { error: 'Failed to delete note' };
    }
}
