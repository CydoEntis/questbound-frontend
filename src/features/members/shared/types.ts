import { UserAvatar } from "../../auth/shared/types";
import { Avatar } from "../../avatars/shared/types";
import { MEMBER_ROLES } from "../utils/utils";

export type Member = {
  id: number;
  role: (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
  userId: string;
  displayName: string;
  email: string;
  avatar: UserAvatar;
  currentLevel: number;
  joinedOn: Date;
};

export type PaginatedMembers = {
  items: Member[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageRange: number[];
};

export type CreateMember = Partial<Pick<Member, "userId" | "id">>;

export type UpdateMemberRole = {
  id: number;
  role: (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
};

export type UpdateCreator = {
  partyId: number;
  newCreatorId: number;
  oldCreatorId: number;
  oldCreatorRole: (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
};

export type MembersToRemove = {
  partyId: number;
  memberIds: number[];
};
