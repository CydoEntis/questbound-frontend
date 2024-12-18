import { Modal, Title } from "@mantine/core";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

import CreateQuestForm from "../quest-form/CreateQuestForm";

type CreateQuestModalProps = {
  isOpened: boolean;
  onClose: () => void;
  partyMembers: PartyMember[];
};

function CreateQuestModal({
  isOpened,
  onClose,
  partyMembers,
}: CreateQuestModalProps) {
  return (
    <Modal
      size="lg"
      opened={isOpened}
      onClose={onClose}
      title={<Title>Create New Quest</Title>}
    >
      <CreateQuestForm partyMembers={partyMembers} />
    </Modal>
  );
}

export default CreateQuestModal;
