import { z } from "zod";
import { updateAccountDetailsSchema } from "./schema";

export type UpdateAccountDetails = z.infer<typeof updateAccountDetailsSchema>;
