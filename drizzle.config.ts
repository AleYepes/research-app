import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Use localhost here because you"ll be running the drizzle-kit CLI from your host machine
    url: process.env.DATABASE_URL || "",
  },
});
