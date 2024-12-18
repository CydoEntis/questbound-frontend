import {
  ActionIcon,
  Button,
  MultiSelect,
  NativeSelect,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Trash2 } from "lucide-react";
import React from "react";

type Props = {};

function CreateQuestForm({}: Props) {
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

 



        <Button variant="light" color="violet" w={200} type="submit">
          Create Quest
        </Button>
      </Stack>
    </form>
  );
}

export default CreateQuestForm;
