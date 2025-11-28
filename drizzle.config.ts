import * as dotenv from 'dotenv';
dotenv.config();  // Ensure .env is loaded

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',  // path to your Drizzle schema
  out: './drizzle',          // folder where migrations will be stored
  dialect: 'postgresql',     // must be 'postgresql' for Postgres/Neon
  dbCredentials: {
    url: process.env.DATABASE_URL!, // now this will be defined
  },
});
