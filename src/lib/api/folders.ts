"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { folders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFolders() {
  try {
    const result = await db.select().from(folders);
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

  await db.insert(folders).values({
    name,
    description: description || null,
    userId: session.user.id,
  });

  revalidatePath("/dashboard/notes");
}

export async function deleteFolder(formData: FormData) {
  const { session } = await getUserAuth();
  if (!session) throw new Error("Not authenticated");

  const folderId = formData.get("id") as string;

  await db.delete(folders).where(eq(folders.id, folderId));

  revalidatePath("/dashboard/notes");
}
