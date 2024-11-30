import { z } from "zod";

export const updateUsernameSchema = z.object({
	username: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(50, "Name cannot exceed 50 characters"),
});
