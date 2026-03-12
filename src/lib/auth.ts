import { db } from "@/db"; // your drizzle instance
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({
  plugins: [expo()],
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
  trustedOrigins: ["skinspaceapp://"],
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
});
