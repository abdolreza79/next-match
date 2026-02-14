import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.email('Email must be a valid email address.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .max(100, 'Password must be at most 100 characters.'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
    //   .max(100, 'Password must be at most 100 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
