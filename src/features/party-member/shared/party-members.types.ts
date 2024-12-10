import { MemberRole } from "../../../shared/types/types";
import { UserAvatar } from "../../avatar/shared/avatar.types";

export type PartyMember = {
    partyId: number,
    username: string,
    currentLevel: number,
    role: MemberRole
    avatar: UserAvatar
}