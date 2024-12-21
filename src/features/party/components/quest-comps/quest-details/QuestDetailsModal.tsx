import { Modal } from "@mantine/core";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import UpdateQuestForm from "../quest-form/UpdateQuestForm";
import { useGetQuestDetails } from "../../../api/quest";

type QuestDetailsModalProps = {
  isQuestDetailOpened: boolean;
  closeQuestDetailHandler: () => void;
  questId: number;
};

function QuestDetailsModal({
  isQuestDetailOpened,
  closeQuestDetailHandler,
  questId,
}: QuestDetailsModalProps) {
  const { data: questDetails } = useGetQuestDetails(questId);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    closeQuestDetailHandler();
    setIsEditing(false);
  };

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
          onCancel={() => setIsEditing(false)}
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
