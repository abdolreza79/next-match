import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma/prisma';

import Credential from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { loginSchema } from './lib/schemas/login-schema';
import { getUserByEmail } from './actions/auth-actions';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  // ...authConfig,
  providers: [
    Credential({
      name: 'Credentials',
      async authorize(credentials) {
        // Validate the credentials
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) {
          return null;
        }
        // Check if the user exists in the database
        const user = await getUserByEmail(validated.data.email);
        if (!user) {
          return null;
        }
        // Compare the provided password with the stored password hash
        const { password } = credentials;
        const isPasswordCorrect = await bcrypt.compare(
          password as string,
          user.passwordHash,
        );
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        // session.user.role = session.user.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        // token.role = user.role;
      }
      return token;
    },
  },
  
});
