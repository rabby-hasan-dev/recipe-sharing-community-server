import { z } from 'zod';
import { UserStatus } from './social.constant';

const userValidationSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'Username is required').trim(),
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .max(20, { message: 'Password can not be more than 20 characters' })
      .trim()
      .optional(),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
