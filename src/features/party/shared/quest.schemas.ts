import { z } from "zod";

export const newQuestSchema = z.object({
  partyId: z.number(),
  name: z
    .string()
    .min(3, "Name must be more than 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(5, "Description must be more than 5 characters")
    .max(120, "Description cannot exceed 120 characters"),
  priorityLevel: z.preprocess((val) => Number(val), z.number().min(1).max(4)),
  steps: z.array(z.string()).default([]),
  partyMembers: z
    .array(z.string())
    .default([])
    .refine((members) => members.length > 0, {
      message: "At least one party member must be assigned to the quest.",
    }),
  dueDate: z.date(),
});
