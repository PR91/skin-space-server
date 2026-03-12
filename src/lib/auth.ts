import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { dash } from "@better-auth/infra";
export const auth = betterAuth({
  appName: "SkinSpace", // Define your application name
  plugins: [expo(), dash()],
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
  trustedOrigins: ["skinspaceapp://"],
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  experimental: {
    joins: true, // Enable database joins for better performance
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
  },
});
