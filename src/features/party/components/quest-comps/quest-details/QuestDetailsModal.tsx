import { Modal } from "@mantine/core";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import UpdateQuestForm from "../quest-form/UpdateQuestForm";
import { useDeleteQuest, useGetQuestDetails } from "../../../api/quest";

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
  const deleteQuest = useDeleteQuest();

  const handleCloseModal = () => {
    closeQuestDetailHandler();
    setIsEditing(false);
  };

  const deleteQuestHandler = async () => {
    await deleteQuest.mutateAsync(questId);
    closeQuestDetailHandler();
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
          deleteQuestHandler={deleteQuestHandler}
        />
      )}
    </Modal>
  );
}

export default QuestDetailsModal;
