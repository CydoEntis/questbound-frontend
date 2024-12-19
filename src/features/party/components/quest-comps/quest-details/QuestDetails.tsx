import {
  Flex,
  Group,
  Modal,
  Stack,
  Title,
  Text,
  Checkbox,
  Badge,
  Button,
} from "@mantine/core";
import { Clock } from "lucide-react";
import { formatDate } from "../../../../../shared/utils/date.utils";
import PriorityBadge from "../priority-badge/PriorityBadge";
import {
  useCompleteQuest,
  useGetQuestDetails,
  useUpdateStepStatus,
} from "../../../api/quest";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";

type QuestDetailProps = {
  isQuestDetailOpened: boolean;
  closeQuestDetailHandler: () => void;
  questId: number;
};

function QuestDetails({
  isQuestDetailOpened,
  closeQuestDetailHandler,
  questId,
}: QuestDetailProps) {
  const { data: questDetails } = useGetQuestDetails(questId);
  const completeQuest = useCompleteQuest();
  const updateQuestStep = useUpdateStepStatus();
  const questCloseHandler = () => {
    closeQuestDetailHandler();
  };

  const handleCheckboxChange = (questStepId: number, isChecked: boolean) => {
    updateQuestStep.mutateAsync({
      questStepId: questStepId,
      isCompleted: isChecked,
    });
  };

  const compelteQuestHandler = async () => {
    await completeQuest.mutateAsync(questId);
    closeQuestDetailHandler();
  };

  return (
    <Modal
      opened={isQuestDetailOpened}
      onClose={questCloseHandler}
      title="Quest Details"
      size="lg"
    >
      {questDetails ? (
        <Stack gap={32}>
          <Flex justify="space-between">
            <PriorityBadge priorityLevel={questDetails.priorityLevel} />
            <Group gap={8}>
              <Clock size={18} />
              <Text size="xs">{formatDate(questDetails.dueDate)}</Text>
            </Group>
          </Flex>
          <Stack gap={4}>
            <Title size="1.65rem">{questDetails.name}</Title>
            <Text c="dimmed">{questDetails.description}</Text>
          </Stack>
          <Stack gap={8}>
            <Title order={4}>Quest Steps</Title>
            {questDetails.questSteps.map((step) => (
              <Checkbox
                key={step.id}
                checked={step.isCompleted}
                label={step.description}
                color="violet"
                readOnly={questDetails.isCompleted}
                onChange={(e) => {
                  if (!questDetails.isCompleted) {
                    handleCheckboxChange(step.id, e.currentTarget.checked);
                  }
                }}
              />
            ))}
          </Stack>
          <Stack gap={4}>
            <Title order={5}>Assigned Members</Title>
            <AvatarList
              partyMembers={questDetails.partyMembers}
              totalMembers={questDetails.totalPartyMembers}
            />
          </Stack>
          <Stack gap={4}>
            <Title order={5}>Rewards</Title>
            <Group gap={4}>
              <Badge color="lime" variant="light">
                Exp {questDetails.expReward}
              </Badge>
              <Badge color="yellow" variant="light">
                Gold {questDetails.goldReward}
              </Badge>
            </Group>
          </Stack>
          <Group justify="end">
            {!questDetails.isCompleted && (
              <Button
                variant="light"
                color="violet"
                onClick={compelteQuestHandler}
              >
                Complete Quest
              </Button>
            )}
          </Group>
        </Stack>
      ) : (
        "Loading..."
      )}
    </Modal>
  );
}

export default QuestDetails;
