import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string({
      errorMap: () => ({
        message: "Username must be between 3 and 15 characters",
      }),
    })
    .max(15)
    .min(3)
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  firstName: z
    .string({
      errorMap: () => ({ message: "Please enter at least 2 characters" }),
    })
    .trim()
    .max(30)
    .min(2),
  lastName: z
    .string({
      errorMap: () => ({ message: "Please enter at least 1 character" }),
    })
    .trim()
    .max(30)
    .min(1),
  pronouns: z
    .string()
    .max(20)
    .regex(/^[a-zA-Z/]*$/, {
      message: "Invalid characters",
    })
    .optional(),
  pronounsOther: z
    .string()
    .max(20)
    .regex(/^[a-zA-Z/]*$/, {
      message: "Invalid characters",
    })
    .optional(),
  bio: z.string().max(500).optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
