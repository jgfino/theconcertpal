import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation, {
      message:
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
