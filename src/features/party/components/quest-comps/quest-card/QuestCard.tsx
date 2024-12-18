import { Card, Stack, Flex, Progress, Group, Badge, Text } from "@mantine/core";
import { Calendar, ListCheck, MessageCircle } from "lucide-react";
import { getPercentage } from "../../../../../shared/utils/account.utils";
import { formatDate } from "../../../../../shared/utils/date.utils";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";
import PriorityBadge from "../priority-badge/PriorityBadge";
import { Quest } from "../../../shared/quest.types";

type QuestCardProps = {
  quest: Quest;
};

function QuestCard({ quest }: QuestCardProps) {
  return (
    <Card bg={"card"} shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap={8}>
        <Flex justify="space-between">
          <Text size="1.75rem" fw={700} truncate="end">
            {quest.name}
          </Text>
          <PriorityBadge priorityLevel={quest.priorityLevel} />
        </Flex>
        <Text truncate="end" lineClamp={4} size="md" c="dimmed">
          {quest.description}
        </Text>
        <Flex align="center" gap={8} w="100%" justify="end">
          <Badge
            leftSection={<Calendar size={14} />}
            variant="outline"
            color="red"
            size="md"
          >
            {formatDate(quest.dueDate)}
          </Badge>
        </Flex>
        <Stack gap={1}>
          <Group gap={4} align="center">
            <ListCheck size={20} />
            <Text size="sm" c="dimmed">
              Steps
            </Text>
          </Group>
          <Flex gap={4} align="center">
            <Progress
              w="90%"
              color="violet"
              radius="xl"
              size="md"
              value={getPercentage(quest.completedSteps, quest.totalSteps)}
              striped
              animated
            />
            <Text size="sm">
              {quest.completedSteps} / {quest.totalSteps}
            </Text>
          </Flex>
        </Stack>
        <Flex justify="space-between">
          <AvatarList partyMembers={quest.partyMembers} />
          <Group gap={2}>
            <MessageCircle size={20} />
            <Text size="md">3</Text>
          </Group>
        </Flex>
      </Stack>
    </Card>
  );
}

export default QuestCard;
