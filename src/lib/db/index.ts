import { env } from "@/lib/env.mjs";
import {
  neon,
  neonConfig,
  NeonQueryFunction,
  Pool,
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Import all schemas and relations
import * as auth from './schema/auth';
import * as folders from './schema/folders';
import * as notes from './schema/notes';

neonConfig.fetchConnectionCache = true;

export const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

// Combine all schemas and relations
const schema = {
  ...auth,
  ...folders,
  ...notes,
};

// Create and export the database instance
export const db = drizzle(sql, { schema });

export const pool = new Pool({ connectionString: env.DATABASE_URL });

// Re-export all schemas and types for convenience
export * from './schema/auth';
export * from './schema/folders';
export * from './schema/notes';

