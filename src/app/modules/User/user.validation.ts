import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),

  email: z.string().email('Invalid email format'),

  role: z.enum(['admin', 'user']).default('user'),

  password: z.string()
    .min(3, { message: "Password must be at least 3 characters" }),

  phone: z.string(),

  address: z.string().optional(),

  status: z.enum(['active', 'blocked']).default('active'),
});


const loginValidationSchema =z.object({
     email: z.string().email('Invalid email format'),
     password: z.string()
    .min(3, { message: "Password must be at least 3 characters" }),
})




export const UserValidation ={
    registerValidationSchema,
    loginValidationSchema
}
