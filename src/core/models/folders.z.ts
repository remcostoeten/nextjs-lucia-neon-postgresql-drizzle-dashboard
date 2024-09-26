import { z } from "zod";

export const folderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
});
