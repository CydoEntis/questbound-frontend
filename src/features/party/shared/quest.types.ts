import { z } from "zod";
import { newQuestSchema } from "./quest.schemas";
import { PartyMember } from "../../party-member/shared/party-members.types";

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
}