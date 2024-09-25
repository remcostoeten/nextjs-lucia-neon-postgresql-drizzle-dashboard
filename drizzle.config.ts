import { env } from "@/core/lib/env.mjs";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/core/server/schema/index.ts",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  }
} satisfies Config;
