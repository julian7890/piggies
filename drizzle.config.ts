import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.tsx",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
