import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  lastName: z.string().optional(),
});

const userSchemavalidation = z
  .string({ required_error: 'userId is Require' })
  .refine(
    (val) => /^[0-9a-fA-F]{24}$/.test(val), // Regular expression to check if it's a valid ObjectId format
    {
      message: 'Invalid ObjectId format',
    },
  );

export const createUserValidationSchema = z.object({
  body: z.object({
    user: userSchemavalidation,
    username: z.string().min(1, 'Username is required').trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .trim(),
    name: UserNameValidationSchema.optional(), // If you want to make it required, remove the `.optional()`
    profilePicture: z.string().url().nullable().optional(), // Expecting URL or null
    bio: z.string().optional(),
    followers: z.array(z.string()).optional(), // Array of ObjectId strings
    following: z.array(z.string()).optional(),
    premiumMembership: z.boolean().default(false),
    premiumExpiresAt: z.date().nullable().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).default('Other'),
    bloogGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    dateOfBirth: z.date().optional(),
    contactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),

});

export const updateUserValidationSchema = z.object({
  body: z.object({
    user: userSchemavalidation.optional(),
    username: z.string().min(1, 'Username is required').trim().optional(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .trim()
      .optional(),
    name: UserNameValidationSchema.optional(), // If you want to make it required, remove the `.optional()`
    profilePicture: z.string().url().nullable().optional(), // Expecting URL or null
    bio: z.string().optional(),
    followers: z.array(z.string()).optional(), // Array of ObjectId strings
    following: z.array(z.string()).optional(),
    premiumMembership: z.boolean().default(false),
    premiumExpiresAt: z.date().nullable().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).default('Other'),
    bloogGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    dateOfBirth: z.date().optional(),
    contactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),

});

export const studentValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
