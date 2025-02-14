import { Card, Stack, Flex, Progress, Group, Text } from "@mantine/core";
import { Clock, MessageCircle } from "lucide-react";
import { getPercentage } from "../../../../../shared/utils/account.utils";
import { formatDate } from "../../../../../shared/utils/date.utils";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";
import PriorityBadge from "../priority-badge/PriorityBadge";
import { Quest } from "../../../shared/quest.types";
import styles from "./quest-card.module.css";

type QuestCardProps = {
  quest: Quest;
  onClick: () => void;
};

function QuestCard({ quest, onClick }: QuestCardProps) {
  return (
    <Card
      bg={"card"}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
      className={styles.card}
    >
      <Stack gap={16}>
        <Flex justify="space-between">
          <PriorityBadge priorityLevel={quest.priorityLevel} />
          <Group gap={8}>
            <Clock size={18} />
            <Text size="xs">{formatDate(quest.dueDate)}</Text>
          </Group>
        </Flex>
        <Flex justify="space-between">
          <Text size="1.5rem" fw={700} truncate="end">
            {quest.name}
          </Text>
        </Flex>
        <Text lineClamp={3} size="md" c="dimmed">
          {quest.description}
        </Text>
        <Flex align="center" gap={8} w="100%" justify="end"></Flex>
        <Stack gap={1}>
          <Progress
            w="100%"
            color="violet"
            radius="xl"
            size="md"
            value={getPercentage(quest.completedSteps, quest.totalSteps)}
            striped
            animated
          />
        </Stack>
        <Flex justify="space-between">
          <AvatarList
            partyMembers={quest.partyMembers}
            totalMembers={quest.totalPartyMembers}
          />
          {quest.commentCount > 0 && (
            <Group gap={2}>
              <MessageCircle size={20} />
              <Text size="md">{quest.commentCount}</Text>
            </Group>
          )}
        </Flex>
      </Stack>
    </Card>
  );
}

export default QuestCard;
