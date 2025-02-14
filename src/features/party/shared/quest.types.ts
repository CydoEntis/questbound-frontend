import { z } from "zod";
import { newQuestSchema, updateQuestSchema } from "./quest.schemas";
import { PartyMember } from "../../party-member/shared/party-members.types";
import { User } from "../../account/shared/account.types";

export type NewQuest = z.infer<typeof newQuestSchema>;
export type UpdateQuest = z.infer<typeof updateQuestSchema>;

export type Quest = {
  id: number;
  name: string;
  description: string;
  priorityLevel: number;
  partyMembers: PartyMember[];
  totalPartyMembers: number;
  totalSteps: number;
  completedSteps: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  completedBy: string | null;
  dueDate: Date;
  expReward: number;
  goldReward: number;
  commentCount: number;
};

export type PaginatedQuests = {
  items: Quest[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageRange: number[];
};

export type QuestStats = {
  totalQuests: number;
  completedQuests: number;
  pastDueQuests: number;
};

export type PaginatedComments = {
  items: QuestComment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageRange: number[];
};

export type QuestComment = {
  id: number;
  questId: number;
  partyMember: User;
  content: string;
  createdAt: Date;
};

export type QuestFile = {
  id: number;
  questId: number;
  partyMember: User;
  filePath: string;
  fileName: string;
  uploadedAt: Date;
};

export type QuestStep = {
  id?: number;
  description: string;
  isCompleted: boolean;
};

export type QuestDetail = {
  id: number;
  name: string;
  description: string;
  priorityLevel: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  completedBy: string | null;
  dueDate: Date;
  expReward: number;
  goldReward: number;
  questComments: QuestComment[];
  questFiles: QuestFile[];
  questSteps: QuestStep[];
  partyMembers: PartyMember[];
  assignedMembers: PartyMember[];
  totalPartyMembers: number;
};

export type QuestStepUpdate = {
  questStepId: number;
  isCompleted: boolean;
};

export type CreateQuestResponse = {
  message: string;
  questId: number;
  partyId: number;
};

export type AddCommentResponse = {
  message: string;
  questId: number;
};

export type DeleteCommentResponse = {
  message: string;
  questId: number;
};

export type ModifedQuestResponse = CreateQuestResponse;
