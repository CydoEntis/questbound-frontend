import { z } from "zod";
import { newQuestSchema } from "./quest.schemas";

export type NewQuest = z.infer<typeof newQuestSchema>;

export type Quest = {
  id: number;
  title: string;
  description: string;
  priorityLevel: number;
  partyMembers: string[];
  totalPartyMembers: number;
  totalSteps: number;
  completedSteps: number;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  completedBy: string | null;
  //   dueDate: Date;
  expReward: number;
  goldReward: number;
};
