import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

import Credential from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { loginSchema } from './lib/schemas/login-schema';
import { getUserByEmail } from './actions/auth-actions';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// Notice this is only an object, not a full Auth.js instance
export const authConfig = {
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
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPath = [
        /\/members/,
        /\/lists/,
        /\/messages/,
        // /\/profile/,
        // /\/user\/(.*)/,
        // /\/order\/(.*)/,
        // /\/admin/,
      ];
      // Get pathname from the req URL object
      const { pathname } = request.nextUrl;
      // Check is user is not authenticated and accecing a protected path
      if (!auth && protectedPath.some((p) => p.test(pathname))) {
        // Redirect them to the login page
        return NextResponse.redirect(new URL('/login', request.url));
      } else {
        return true;
      }

      // if (!request.cookies.get('sessionCartId')) {
      //   // const sessionCartId = crypto.randomUUID();
      //   // clone the request headers
      //   // const newRequestHeaders = new Headers(request.headers);
      //   // // create new response and add the new headers
      //   // const response = NextResponse.next({
      //   //   request: {
      //   //     headers: newRequestHeaders,
      //   //   },
      //   // });
      //   // response.cookies.set('sessionCartId', sessionCartId);
      //   return NextResponse.next();
      // } else {
      //   return true;
      // }
    },
  },
} satisfies NextAuthConfig;
