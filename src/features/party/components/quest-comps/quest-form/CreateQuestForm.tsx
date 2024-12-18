import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import PartyMemberSelect from "../party-member-select/PartyMemberSelect";
import { useCreateQuest } from "../../../api/quest";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { newQuestSchema } from "../../../shared/quest.schemas";
import { NewQuest } from "../../../shared/quest.types";
import { Route } from "../../../../../routes/_authenticated/parties/$partyId";
import DueDatePicker from "../due-date-picker/DueDatePicker";
import { useState } from "react";
import PriorityLevelSelect from "../priorty-level-select/PriortiyLevelSelect";
import AddQuestStep from "../add-quest-step/AddQuestStep";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

type CreateQuestFormProps = {
  partyMembers: PartyMember[];
};

function CreateQuestForm({ partyMembers }: CreateQuestFormProps) {
  const { partyId } = Route.useParams();
  const createQuest = useCreateQuest();
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

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

  async function onSubmit(newQuest: NewQuest) {
    try {
      await createQuest.mutateAsync(newQuest);
    } catch (error) {
      console.log(error);
    }
  }

  return (
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

        <AddQuestStep form={form} />

        <PriorityLevelSelect form={form} />

        <PartyMemberSelect
          partyMembers={partyMembers}
          multiSelectProps={form.getInputProps("members")}
        />

        <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />

        <Button variant="light" color="violet" w={200} type="submit">
          Create Quest
        </Button>
      </Stack>
    </form>
  );
}

export default CreateQuestForm;
