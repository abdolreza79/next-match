'use server';

import { User } from '@/app/generated/prisma/client';
import { auth, signIn, signOut } from '@/auth';
import { loginSchema, LoginSchema } from '@/lib/schemas/login-schema';
import { registerSchema, RegisterSchema } from '@/lib/schemas/register-schema';
import { prisma } from '@/prisma/prisma';
import { ActionResult } from '@/types';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function registerUser(
  data: RegisterSchema,
): Promise<ActionResult<User>> {
  // Validate the input data using the Zod schema
  try {
    // throw new Error('This is a test error to check error handling');
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return {
        status: 'error',
        error: validated.error.issues,
      };
    }
    // Hash the password
    const { name, email, password } = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return {
        status: 'error',
        error: 'User already exists',
      };
    }
    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return {
      status: 'success',
      data: user,
    };
  } catch (e) {
    console.log(e);
    return {
      status: 'error',
      error: 'Something went wrong while creating the user',
    };
  }
}

export async function signInUser(
  data: LoginSchema,
): Promise<ActionResult<string>> {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return {
      status: 'success',
      data: 'Logged in successfully',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            status: 'error',
            error: 'Invalid email or password',
          };
        default:
          return {
            status: 'error',
            error: 'Something went wrong while signing in',
          };
      }
    } else {
      return {
        status: 'error',
        error: 'Something else went wrong while signing in',
      };
    }
  }
}

export async function signOutUser() {
  try {
    await signOut({ redirectTo: '/' });
    // return {
    //   status: 'success',
    //   data: 'Signed out successfully',
    // };
  } catch (error) {
    // return {
    //   status: 'error',
    //   error: 'Something went wrong while signing out',
    // };
  }
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');
  return userId;
}
