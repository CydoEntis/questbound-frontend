import { z } from "zod";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.schemas";
import { AuthenticatedUser, User } from "../../account/shared/account.types";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  tokens: Tokens;
  user: User;
};

export type StoredUser = {
  user: AuthenticatedUser;
  tokens: Tokens;
};
