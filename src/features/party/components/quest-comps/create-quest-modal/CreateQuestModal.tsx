import { Modal } from "@mantine/core";
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
      title="Create New Quest"
    >
      <CreateQuestForm partyMembers={partyMembers} handleClose={onClose} />
    </Modal>
  );
}

export default CreateQuestModal;
