import { z } from "zod";
import { newQuestSchema } from "./quest.schemas";
import { PartyMember } from "../../party-member/shared/party-members.types";
import { User } from "../../account/shared/account.types";

export type NewQuest = z.infer<typeof newQuestSchema>;

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
  questId: number;
  description: string;
  isCompleted: boolean;
};

export type QuestDetail = {
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
  totalPartyMembers: number;
};
