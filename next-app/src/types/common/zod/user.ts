import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" })
    .max(15, { message: "Must be less than 15 characters long" }),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(5, { message: "Must be at least 5 characters long" }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

export const createUserSchema = userSchema
  .extend({
    confirmPassword: z
      .string()
      .min(5, { message: "Must be at least 5 characters long" }),
  })
  .omit({ createdAt: true, updatedAt: true })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
  });

export type User = z.infer<typeof userSchema>;
