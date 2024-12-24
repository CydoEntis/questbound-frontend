import PartyModal from "../party-modals/PartyModal";
import { useGetPartyMembers } from "../../../api/party";

import { MEMBER_ROLES } from "../../../../../shared/utils/constants";

import PartyManagementForm from "./PartyManagementForm";
import PartyLeaderManagementForm from "./PartyLeaderManagementForm";
import { useState } from "react";
import { Group, Stack } from "@mantine/core";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import PartyRole from "../party-role/PartyRole";

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
  const [editingPartyLeader, setEditingPartyLeader] = useState(false);
  const [editingPartyMembers, setEditingPartyMembers] = useState(false);

  if (!partyMembers) return null;

  const leader = partyMembers.find(
    (member) => member.role === MEMBER_ROLES.LEADER
  );
  const otherMembers = partyMembers.filter(
    (member) => member.role !== MEMBER_ROLES.LEADER
  );

  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Party Management">
      {editingPartyLeader && (
        <PartyLeaderManagementForm
          partyLeader={leader!}
          partyMembers={otherMembers}
        />
      )}
      {editingPartyMembers && (
        <PartyManagementForm partyMembers={otherMembers} />
      )}
      <Stack>
        <PartyRole
          avatar={leader!.avatar}
          username={leader!.username}
          role={leader!.role}
        />
        {otherMembers.map((member) => (
          <PartyRole key={member.userId} {...member} />
        ))}
      </Stack>
    </PartyModal>
  );
}

export default PartyManagementModal;
