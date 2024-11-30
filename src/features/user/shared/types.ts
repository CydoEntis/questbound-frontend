import { z } from "zod";
import { updateUsernameSchema } from "./schemas";

export type UpdateUsername = z.infer<typeof updateUsernameSchema>;
