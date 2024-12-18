import {
  MultiSelect,
  TextInput,
  Modal,
  Textarea,
  Stack,
  Button,
  ActionIcon,
  NativeSelect,
  Group,
  Text,
  MultiSelectProps,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState, useEffect } from "react";
import { NewQuest } from "../../../shared/quest.types";
import { newQuestSchema } from "../../../shared/quest.schemas";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { Trash2 } from "lucide-react";
import { DateInput } from "@mantine/dates";
import { Route } from "../../../../../routes/_authenticated/parties/$partyId";
import { useCreateQuest } from "../../../api/quest";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { UserAvatar } from "../../../../avatar/shared/avatar.types";

export type QuestDrawerType = "create" | "edit" | "view";

type QuestDrawerProps = {
  isOpened: boolean;
  onClose: () => void;
  partyMembers: PartyMember[];
};

function QuestDrawer({ isOpened, onClose, partyMembers }: QuestDrawerProps) {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const { partyId } = Route.useParams();
  const createQuest = useCreateQuest();

  const form = useForm<NewQuest>({
    validate: zodResolver(newQuestSchema),
    initialValues: {
      partyId: partyId ? Number(partyId) : 0,
      name: "",
      description: "",
      priorityLevel: 1,
      steps: [],
      partyMembers: [],
      dueDate: new Date(),
    },
    transformValues: (values) => ({
      ...values,
      priorityLevel: Number(values.priorityLevel),
    }),
  });

  useEffect(() => {
    if (dueDate && dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const memberData = partyMembers.map((member) => ({
    value: member.username, 
    label: member.username, 
    avatar: member.avatar, 
  }));
  

  const memberRecord = partyMembers.reduce(
    (acc, member) => {
      acc[member.username] = {
        username: member.username,
        avatar: member.avatar,
      };
      return acc;
    },
    {} as Record<string, { username: string; avatar: UserAvatar }>
  );

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <AvatarDisplay avatar={memberRecord[option.value].avatar} />
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  );

  async function onSubmit(newQuest: NewQuest) {
    try {
      await createQuest.mutateAsync(newQuest);
    } catch (error) {
      console.log(error);
    }
  }

  function addStep() {
    const steps = [...form.values.steps, ""];
    form.setFieldValue("steps", steps);
  }

  function updateStep(index: number, value: string) {
    const steps = [...form.values.steps];
    steps[index] = value;
    form.setFieldValue("steps", steps);
  }

  return (
    <Modal size="lg" opened={isOpened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={8}>
          <TextInput
            label="Quest Name"
            placeholder="The Name of your Quest"
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Quest Description"
            placeholder="Describe your quest"
            minRows={6}
            autosize
            {...form.getInputProps("description")}
          />

          {(form.values.steps || []).map((step, index) => (
            <TextInput
              key={index}
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              label={`Step ${index + 1}`}
              placeholder={`Describe step ${index + 1}`}
              rightSection={
                <ActionIcon
                  variant="light"
                  color="red"
                  onClick={() => {
                    const steps = (form.values.steps || []).filter(
                      (_, i) => i !== index
                    );
                    form.setFieldValue("steps", steps);
                  }}
                >
                  <Trash2 size={18} />
                </ActionIcon>
              }
            />
          ))}

          <Button variant="light" color="violet" w={100} onClick={addStep}>
            Add Step
          </Button>

          <NativeSelect
            {...form.getInputProps("priorityLevel")}
            data={[
              { value: "1", label: "Low" },
              { value: "2", label: "Medium" },
              { value: "3", label: "High" },
              { value: "4", label: "Critical" },
            ]}
            label="Priority Level"
          />

          <MultiSelect
            label="Assign Party Members"
            placeholder="Select Party Member"
            data={memberData}
            {...form.getInputProps("members")}
            renderOption={renderMultiSelectOption}
          />

          <DateInput
            value={dueDate}
            onChange={setDueDate}
            label="Due Date"
            minDate={new Date()} // Prevent selection of past dates
            placeholder="Select due date"
          />

          <Button variant="light" color="violet" w={200} type="submit">
            Create Quest
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default QuestDrawer;
