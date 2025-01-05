import { z } from "zod";
import { updateAccountSchema } from "./account.schemas";
import { UserAvatar } from "../../avatar/shared/avatar.types";

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

export type UpdateUserRequest = {
  email?: string;
  username?: string;
};

export type UpdateUserResponse = {
  id: string;
  email: string;
  username: string;
};

export type DateRangeRequest = {
  year: number;
  month: number;
}

export type MonthlyQuestBreakdown = {
  [key: number]: number;
}

export type UserStatsResponse = {
  userId: string;
  currentLevel: number;
  currentExperience: number;
  experienceToLevelUp: number;
  gold: number;
  totalQuests: number;
  completedQuests: number;
  pastDueQuests: number;
  partiesJoined: number;
  unlockedAvatarCount: number;
  totalAvatarCount: number;
}

export type UpdateAccount = z.infer<typeof updateAccountSchema>;
