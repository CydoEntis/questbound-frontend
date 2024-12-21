import {
  Flex,
  Group,
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
  useUpdateStepStatus,
} from "../../../api/quest";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";
import QuestDetailsMenu from "./QuestDetailsMenu";
import { QuestDetail } from "../../../shared/quest.types";

type QuestDetailProps = {
  closeQuestDetailHandler: () => void;
  questDetails: QuestDetail;
  editQuestHandler: () => void;
  deleteQuestHandler: () => void;
};

function QuestDetails({
  closeQuestDetailHandler,
  questDetails,
  editQuestHandler,
  deleteQuestHandler,
}: QuestDetailProps) {
  const completeQuest = useCompleteQuest();
  const updateQuestStep = useUpdateStepStatus();

  const handleCheckboxChange = (questStepId: number, isChecked: boolean) => {
    updateQuestStep.mutateAsync({
      questStepId: questStepId,
      isCompleted: isChecked,
    });
  };

  const compelteQuestHandler = async () => {
    await completeQuest.mutateAsync(questDetails.id);
    closeQuestDetailHandler();
  };

  return (
    <>
      {questDetails ? (
        <Stack gap={32}>
          <Flex justify="space-between">
            <PriorityBadge priorityLevel={questDetails.priorityLevel} />
            <QuestDetailsMenu
              onEdit={editQuestHandler}
              onDelete={deleteQuestHandler}
            />
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
            <Title order={5}>Due Date</Title>
            <Group gap={8}>
              <Clock size={18} />
              <Text size="xs">{formatDate(questDetails.dueDate)}</Text>
            </Group>
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
    </>
  );
}

export default QuestDetails;
