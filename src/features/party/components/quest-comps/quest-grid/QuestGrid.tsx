import QuestCard from "../quest-card/QuestCard";
import {
  Modal,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Group,
  Flex,
} from "@mantine/core";
import { Quest, QuestDetail } from "../../../shared/quest.types";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import PriorityBadge from "../priority-badge/PriorityBadge";
import { Clock } from "lucide-react";
import { formatDate } from "../../../../../shared/utils/date.utils";
import QuestDetails from "../quest-details/QuestDetails";

type QuestGridProps = {
  quests: Quest[];
};

function QuestGrid({ quests }: QuestGridProps) {
  const [
    isQuestDetailOpened,
    { open: openQuest, close: closeQuestDetailHandler },
  ] = useDisclosure(false);
  const [selectedQuest, setSelectedQuest] = useState<number>(0);

  const questOpenHandler = (questId: number) => {
    setSelectedQuest(questId);
    openQuest();
  };

  return (
    <>
      <QuestDetails
        isQuestDetailOpened={isQuestDetailOpened}
        closeQuestDetailHandler={closeQuestDetailHandler}
        questId={selectedQuest}
      />
      <SimpleGrid
        type="container"
        cols={{
          base: 1,
          "550px": 1,
          "725px": 2,
          "1000px": 3,
          "1700px": 4,
          "2000px": 6,
        }}
      >
        {quests.map((quest) => (
          <QuestCard
            quest={quest}
            key={quest.id}
            onClick={() => questOpenHandler(quest.id)}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default QuestGrid;
