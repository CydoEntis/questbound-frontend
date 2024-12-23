import { Title } from "@mantine/core";
import PartyModal from "../party-modals/PartyModal";
import { useGetPartyMembers } from "../../../api/party";
import { Route } from "../../../../../routes/_authenticated/parties/$partyId";

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

  console.log("All party members ", partyMembers);

  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Party Management">
      <Title>Party Management</Title>
    </PartyModal>
  );
}

export default PartyManagementModal;
