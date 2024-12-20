import { Modal } from "@mantine/core";
import React, { useState } from "react";
import QuestDetails from "./QuestDetails";

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
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Modal
      opened={isQuestDetailOpened}
      onClose={closeQuestDetailHandler}
      title="Quest Details"
      size="lg"
    >
      {isEditing ? (
        <div>Editing</div>
      ) : (
        <QuestDetails
          questId={questId}
          closeQuestDetailHandler={closeQuestDetailHandler}
          editQuestHandler={() => setIsEditing(true)}
          deleteQuestHandler={() => console.log(questId)}
        />
      )}
    </Modal>
  );
}

export default QuestDetailsModal;
