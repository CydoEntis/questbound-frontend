import { MemberRole } from "../../../shared/types";
import { UserAvatar } from "../../avatar/shared/avatar.types";

export type PartyMember = {
  userId: string;
  partyId: number;
  username: string;
  currentLevel: number;
  role: MemberRole;
  avatar: UserAvatar;
  joinDate: Date;
};
