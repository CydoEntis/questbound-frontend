import { Modal } from "@mantine/core";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import UpdateQuestForm from "../quest-form/UpdateQuestForm";
import { useGetQuestDetails } from "../../../api/quest";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

type QuestDetailsModalProps = {
  isQuestDetailOpened: boolean;
  closeQuestDetailHandler: () => void;
  questId: number;
  partyMembers: PartyMember[];
};

function QuestDetailsModal({
  isQuestDetailOpened,
  closeQuestDetailHandler,
  questId,
  partyMembers
}: QuestDetailsModalProps) {
  const { data: questDetails } = useGetQuestDetails(questId);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    closeQuestDetailHandler();
    setIsEditing(false);
  }

  console.log(partyMembers);

  return (
    <Modal
      opened={isQuestDetailOpened}
      onClose={handleCloseModal}
      title="Quest Details"
      size="lg"
    >
      {isEditing ? (
        <UpdateQuestForm
          questDetails={questDetails!}
          close={handleCloseModal}
          partyMembers={partyMembers}
        />
      ) : (
        <QuestDetails
          questDetails={questDetails!}
          closeQuestDetailHandler={handleCloseModal}
          editQuestHandler={() => setIsEditing(true)}
          deleteQuestHandler={() => console.log(questDetails!.id)}
        />
      )}
    </Modal>
  );
}

export default QuestDetailsModal;
