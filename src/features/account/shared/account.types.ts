import { z } from "zod";
import {
  changePasswordSchema,
  updateAccountDetailsSchema,
} from "./account.schemas";

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

export type AuthenticatedUser = User & {
  isAuthenticated: boolean;
};

export type UserAvatar = {
  id: number;
  name: string;
  displayName: string;
  imageUrl: string;
};

export type LockedAvatar = {
  id: number;
  name: string;
  displayName: string;
  imageUrl: string;
  unlockLevel: number;
  unlockCost: number;
  tier: number;
};

export type UpdateUserRequest = {
  email?: string;
  username?: string;
};

export type UpdateUserResponse = {
  id: string;
  email: string;
  username: string;
};

export type UpdateAccountDetails = z.infer<typeof updateAccountDetailsSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
