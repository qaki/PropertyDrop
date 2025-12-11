import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
          async authorize(credentials) {
            const parsed = loginSchema.safeParse(credentials);
            if (!parsed.success) return null;

            const user = await db.user.findUnique({
              where: { email: parsed.data.email },
            });

            if (!user || !user.passwordHash) return null;

            // Check if email is verified
            if (!user.emailVerified) {
              throw new Error("Please verify your email before signing in. Check your inbox for the verification link.");
            }

            const isValid = await bcrypt.compare(
              parsed.data.password,
              user.passwordHash
            );
            if (!isValid) return null;

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            };
          },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
