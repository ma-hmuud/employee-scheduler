import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL as string,
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  socialProviders: {
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    skipStateCookieCheck: true,
  },
});

export type Session = typeof auth.$Infer.Session;
