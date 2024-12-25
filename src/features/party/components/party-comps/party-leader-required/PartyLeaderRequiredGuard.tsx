import { ReactNode } from "react";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";

type PartyLeaderRequiredGuardProps = {
  memberRole: number;
  children: ReactNode;
};

function PartyLeaderRequiredGuard({
  memberRole,
  children,
}: PartyLeaderRequiredGuardProps) {
  return memberRole === MEMBER_ROLES.LEADER ? <>{children}</> : null;
}

export default PartyLeaderRequiredGuard;
