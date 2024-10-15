import { z } from "zod";

export const createActivitySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    duration: z.number().min(1, 'Duration must be at least 1 minute'),
    icon: z.string(),
    color: z.string()
})
