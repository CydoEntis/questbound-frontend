import { z } from "zod";
import { PartyMember } from "../../party-member/shared/party-members.types";
import { partySchema, searchSchema } from "./party.schemas";

export type SearchTerm = z.infer<typeof searchSchema>;
export type PartyData = z.infer<typeof partySchema>;

export type Party = {
  id: number;
  name: string;
  creatorId: string;
  creator: string;
  description: string;
  // color: Color;
  partyMembers: PartyMember[];
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  // questStats: QuestStats;
  currentUserRole: string;
};

export type PaginatedParties = {
  items: Party[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageRange: number[];
};

export type NewParty = {
  title: string;
  description: string;
};

export type UpdateParty = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
};

export type UpdatePartyLeader = {
  partyId: number;
  userId: string;
};

export type NewPartyCreator = {
  partyId: number;
  memberId: number;
};
