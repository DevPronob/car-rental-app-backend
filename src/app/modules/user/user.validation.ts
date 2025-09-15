import z from 'zod';
import { Role } from './user.constant';

const createUserSchemaValidation = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),

  email: z
    .string()
    .min(5, { message: 'Email must be at least 5 characters long.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),

  isBlocked: z.boolean().optional().default(false),

  role: z.enum(Object.values(Role)).default('RIDER'),
});

const loginSchemaValidation = z.object({
  email: z
    .string()
    .min(5, { message: 'Email must be at least 5 characters long.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});
export const UserValidation = {
  createUserSchemaValidation,
  loginSchemaValidation,
};
