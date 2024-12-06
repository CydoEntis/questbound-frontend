import { z } from "zod";

export const updateAccountSchema = z.object({
  email: z.string().email("Please enter a valid email").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .optional(),
});


