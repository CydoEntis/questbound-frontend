import { MemberRole } from "../../../shared/types";
import { UserAvatar } from "../../avatar/shared/avatar.types";

export type PartyMember = {
  userId: string;
  partyId: number;
  username: string;
  currentLevel: number;
  role: MemberRole;
  avatar: UserAvatar;
  joinedAt: Date;
};

export type MemberUpdate = {
  id: string;
  role: number;
  delete: boolean;
};

export type ChangeLeader = {
  currentLeaderId: string;
  newLeaderId: string;
  newRoleForPreviousLeader: number;
};

export type UpdatePartyMemberResponse = {
  message: string;
  partyId: number;
  partyMemberId: number;
};