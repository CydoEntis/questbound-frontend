import {
  ActionIcon,
  Button,
  NativeSelect,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Trash2 } from "lucide-react";
import PartyMemberSelect from "../party-member-select/PartyMemberSelect";
import { useCreateQuest } from "../../../api/quest";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { newQuestSchema } from "../../../shared/quest.schemas";
import { NewQuest } from "../../../shared/quest.types";
import { Route } from "../../../../../routes/_authenticated/parties/$partyId";
import DueDatePicker from "../due-date-picker/DueDatePicker";
import { useState } from "react";

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
