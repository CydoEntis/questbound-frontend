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
import { Quest } from "../../../shared/quest.types";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import PriorityBadge from "../priority-badge/PriorityBadge";
import { Clock } from "lucide-react";
import { formatDate } from "../../../../../shared/utils/date.utils";

type QuestGridProps = {
  quests: Quest[];
};

function QuestGrid({ quests }: QuestGridProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const questOpenHandler = (quest: Quest) => {
    setSelectedQuest(quest);
    open();
  };

  const questCloseHandler = () => {
    setSelectedQuest(null);
    close();
  };

  return (
    <>
      <Modal
        opened={opened} // Open modal if questId exists in the query
        onClose={questCloseHandler}
        title="Quest Details"
      >
        {selectedQuest ? (
          <Stack>
            <Flex justify="space-between">
              <PriorityBadge priorityLevel={selectedQuest.priorityLevel} />
              <Group gap={8}>
                <Clock size={18} />
                <Text size="xs">{formatDate(selectedQuest.dueDate)}</Text>
              </Group>
            </Flex>
            <Title size="1.65rem">{selectedQuest.name}</Title>
            <Text c="dimmed">{selectedQuest.description}</Text>
            {selectedQuest.ste}
          </Stack>
        ) : (
          "Loading..."
        )}
      </Modal>

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
            onClick={() => questOpenHandler(quest)}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default QuestGrid;
