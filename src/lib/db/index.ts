import {
  neon,
  neonConfig,
  NeonQueryFunction,
  Pool,
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env.mjs";

neonConfig.fetchConnectionCache = true;

export const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);
export const db = drizzle(sql);

export const pool = new Pool({ connectionString: env.DATABASE_URL });
