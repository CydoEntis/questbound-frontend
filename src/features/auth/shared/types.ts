import { z } from "zod";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schema";

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;


export type User = {
  id: string;
  username: string;
  email: string;
  gold: number;
  currentLevel: number;
  currentExp: number;
  expToNextLevel: number;
  avatar: UserAvatar;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserAvatar = {
  name: string;
  displayName: string;
  imageUrl: string;
};

export type LoginResponse = {
  tokens: Tokens;
  user: User;
};

export type AuthenticatedUser = User & {
  isAuthenticated: boolean;
};

export type StoredUser = {
  user: AuthenticatedUser;
  tokens: Tokens;
};
