"use server";

import { db } from "@/lib/db";
import { folders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getUserAuth } from "../auth/utils";

export async function getFolders() {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Not authenticated");

  try {
    const result = await db.select().from(folders).where(eq(folders.userId, session.user.id));
    return { folders: result };
  } catch (error) {
    console.error("Failed to fetch folders:", error);
    return { error: "Failed to fetch folders" };
  }
}

export async function createFolder(formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Not authenticated");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;

  try {
    await db.insert(folders).values({
      name,
      description: description || null,
      userId: session.user.id,
    });
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to create folder:", error);
    return { error: "Failed to create folder" };
  }
}

export async function updateFolder(formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Not authenticated");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;

  try {
    await db.update(folders)
      .set({ name, description: description || null })
      .where(eq(folders.id, id))
      .where(eq(folders.userId, session.user.id));
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to update folder:", error);
    return { error: "Failed to update folder" };
  }
}

export async function deleteFolder(formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Not authenticated");

  const id = formData.get("id") as string;

  try {
    await db.delete(folders)
      .where(eq(folders.id, id))
      .where(eq(folders.userId, session.user.id));
    revalidatePath("/dashboard/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete folder:", error);
    return { error: "Failed to delete folder" };
  }
}
