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
import useFormErrorHandler from "../../../../../shared/hooks/useHandleErrors";
import { ErrorResponse } from "../../../../../api/errors/error.types";

type CreateQuestFormProps = {
  partyMembers: PartyMember[];
  close: () => void;
};

function CreateQuestForm({ partyMembers }: CreateQuestFormProps) {
  const { partyId } = Route.useParams();
  const createQuest = useCreateQuest();
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const { handleFormErrors } = useFormErrorHandler<NewQuest>();

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

      form.reset();
      close();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={8}>
        <TextInput
          classNames={{
            input: "input",
          }}
          label="Quest Name"
          placeholder="The Name of your Quest"
          {...form.getInputProps("name")}
        />
        <Textarea
          classNames={{
            input: "input",
          }}
          label="Quest Description"
          placeholder="Describe your quest"
          minRows={6}
          autosize
          {...form.getInputProps("description")}
        />

        <AddQuestStep form={form} />

        <PriorityLevelSelect form={form} />

        <PartyMemberSelect partyMembers={partyMembers} form={form} />

        <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />

        <Button variant="light" color="violet" w={200} type="submit">
          Create Quest
        </Button>
      </Stack>
    </form>
  );
}

export default CreateQuestForm;
