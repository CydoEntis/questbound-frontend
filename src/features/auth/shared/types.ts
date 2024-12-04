import { z } from "zod";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;


export type UserResponse = {
  id: string;
  username: string;
  email: string;
  gold: number;
  currentLevel: number;
  currentExp: number;
  expToNextLevel: number;
  avatar: UserAvatar;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserAvatar = {
  name: string;
  displayName: string;
  imageUrl: string;
};

export type LoginResponse = {
  tokens: TokensResponse;
  user: UserResponse;
};

export type AuthenticatedUser = UserResponse & {
  isAuthenticated: boolean;
};

export type StoredUser = {
  user: AuthenticatedUser;
  tokens: TokensResponse;
};
