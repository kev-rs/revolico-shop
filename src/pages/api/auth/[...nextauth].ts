import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { loginAuth } from "@common/auth";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({ token, ...rest }) {
      if(rest.user) {
        token.user = rest.user
      }
      return token
    },
    session({ session, token }) {
      // TODO: remove any
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt'
  },
  secret: 'secret',
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const check = loginAuth.safeParse(creds);
        if (!check.success) throw new Error(check.error.issues[0]?.message);

        const check_user = await prisma.auth.findUnique({ where: { email: check.data.email } })
        if (!check_user) throw new Error('User not found');

        if (!bcrypt.compareSync(check.data.password, check_user.password)) throw new Error('Your password is wrong!');

        return check_user;
      }
    })
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signIn",
    newUser: "/auth/signUp",
  }
};

export default NextAuth(authOptions);
