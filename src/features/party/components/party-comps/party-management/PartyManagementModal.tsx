import PartyModal from "../party-modals/PartyModal";
import { useGetPartyMembers } from "../../../api/party";

import { MEMBER_ROLES } from "../../../../../shared/utils/constants";

import PartyManagementForm from "./PartyManagementForm";
import PartyLeaderManagementForm from "./PartyLeaderManagementForm";

type PartyManagementModalProps = {
  isOpened: boolean;
  onClose: () => void;
  partyId: number;
};

function PartyManagementModal({
  isOpened,
  onClose,
  partyId,
}: PartyManagementModalProps) {
  const { data: partyMembers } = useGetPartyMembers(partyId);

  if (!partyMembers) return null;

  const leader = partyMembers.find(
    (member) => member.role === MEMBER_ROLES.LEADER
  );
  const otherMembers = partyMembers.filter(
    (member) => member.role !== MEMBER_ROLES.LEADER
  );

  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Party Management">
      <PartyLeaderManagementForm partyLeader={leader!} />
      <PartyManagementForm partyMembers={otherMembers} />
    </PartyModal>
  );
}

export default PartyManagementModal;
