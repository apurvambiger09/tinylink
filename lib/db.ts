// lib/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// Create Postgres connection pool
const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export Drizzle ORM client
export const db = drizzle(client);
