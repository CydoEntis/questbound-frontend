import QuestCard from "../quest-card/QuestCard";
import { SimpleGrid } from "@mantine/core";
import { Quest } from "../../../shared/quest.types";

type QuestGridProps = {
  quests: Quest[];
};

function QuestGrid({ quests }: QuestGridProps) {
  return (
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
        <QuestCard quest={quest} key={quest.id} />
      ))}
    </SimpleGrid>
  );
}

export default QuestGrid;
