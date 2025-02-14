import { z } from "zod";
import { PartyMember } from "../../party-member/shared/party-members.types";
import { inviteSchema, partySchema, searchSchema } from "./party.schemas";

export type SearchTerm = z.infer<typeof searchSchema>;
export type PartyData = z.infer<typeof partySchema>;
export type InviteMember = z.infer<typeof inviteSchema>;

export type Party = {
  id: number;
  name: string;
  creatorId: string;
  creator: string;
  description: string;
  partyMembers: PartyMember[];
  totalPartyMembers: number;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  totalQuests: number;
  completedQuests: number;
  pastDueQuests: number;
  currentUserRole: number;
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
  name: string;
  description: string;
};


export type UpdatePartyLeader = {
  partyId: number;
  userId: string;
};

export type NewPartyCreator = {
  partyId: number;
  memberId: number;
};

export type PartyModifiedResponse = {
  message: string;
  partyId: number;
}

export type AcceptInviteResponse = {
  message: string;
  partyId: number;
  partyName: string;
  partyDescription: string;
}