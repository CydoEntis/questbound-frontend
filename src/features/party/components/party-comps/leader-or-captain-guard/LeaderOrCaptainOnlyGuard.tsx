import { ReactNode } from "react";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";

type LeaderOrCaptainOnlyGuardProps = {
  memberRole: number;
  children: ReactNode;
};

function LeaderOrCaptainOnlyGuard({
  memberRole,
  children,
}: LeaderOrCaptainOnlyGuardProps) {
  return memberRole === MEMBER_ROLES.LEADER ||
    memberRole === MEMBER_ROLES.CAPTAIN ? (
    <>{children}</>
  ) : null;
}

export default LeaderOrCaptainOnlyGuard;
