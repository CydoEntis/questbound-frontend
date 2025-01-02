import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().optional(),
});

export const partySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be more than 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(5, "Description must be more than 5 characters")
    .max(120, "Description cannot exceed 120 characters"),
});

export const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
});
