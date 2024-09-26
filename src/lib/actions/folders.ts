"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { folders, folderSchema } from "@/lib/db/schema/folders";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";

export async function createFolder(formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorized" };

  const result = folderSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: "Invalid data" };
  }

  const { name, color, description } = result.data;

  try {
    await db.insert(folders).values({
      id: generateId(15),
      name,
      color,
      description,
      userId: session.user.id,
    });
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create folder" };
  }
}

export async function getFolders() {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorized" };

  try {
    const userFolders = await db
      .select()
      .from(folders)
      .where(eq(folders.userId, session.user.id));
    return { folders: userFolders };
  } catch (error) {
    return { error: "Failed to fetch folders" };
  }
}

export async function deleteFolder(folderId: string) {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorized" };

  try {
    await db.delete(folders).where(eq(folders.id, folderId));
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete folder" };
  }
}

export async function updateFolder(folderId: string, formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorized" };

  const result = folderSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: "Invalid data" };
  }

  const { name, color, description } = result.data;

  try {
    await db.update(folders).set({ name, color, description }).where(eq(folders.id, folderId));
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update folder" };
  }
}
