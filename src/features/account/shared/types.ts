import { z } from "zod";
import { updateAccountDetailsSchema } from "./schema";

export type UpdateAccountDetails = z.infer<typeof updateAccountDetailsSchema>;

export type UpdateUserRequest = {
  email?: string;
  username?: string;
};

export type UpdateUserResponse = {
  id: string;
  email: string;
  username: string;
};
