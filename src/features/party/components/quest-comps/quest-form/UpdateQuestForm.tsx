import { Button, Stack, Textarea, TextInput, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { updateQuestSchema } from "../../../shared/quest.schemas";
import {
  QuestDetail,
  UpdateQuest,
  QuestStep,
} from "../../../shared/quest.types";
import DueDatePicker from "../due-date-picker/DueDatePicker";
import { Trash2 } from "lucide-react";
import { useState, useRef } from "react";

import UpdatePriorityLevelSelect from "../priorty-level-select/UpdatePriortyLevelSelect";
import UpdatePartyMemberSelect from "../party-member-select/UpdatePartyMemberSelect";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

type UpdateQuestFormProps = {
  questDetails: QuestDetail; // The quest object to update
  close: () => void;
};

function UpdateQuestForm({
  questDetails,
  close,
  partyMembers,
}: UpdateQuestFormProps) {
  const [dueDate, setDueDate] = useState<Date | null>(
    new Date(questDetails.dueDate)
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<UpdateQuest>({
    validate: zodResolver(updateQuestSchema),
    initialValues: {
      questId: questDetails.id,
      name: questDetails.name || "",
      description: questDetails.description || "",
      priorityLevel: questDetails.priorityLevel || 1,
      steps: questDetails.questSteps || [],
      assignedMembers: questDetails.assignedMembers.map((member) => member.userId) || [],
      dueDate: new Date(questDetails.dueDate),
    },
    transformValues: (values) => ({
      ...values,
      priorityLevel: Number(values.priorityLevel),
    }),
  });

  function addStep() {
    const steps = [
      ...form.values.steps,
      { id: Date.now(), description: "", isCompleted: false },
    ];
    form.setFieldValue("steps", steps);

    // Allow React to update DOM, then focus the new input
    setTimeout(() => {
      inputRefs.current[steps.length - 1]?.focus();
    }, 0);
  }

  function updateStep(index: number, value: string) {
    const steps = [...form.values.steps];
    steps[index].description = value;
    form.setFieldValue("steps", steps);
  }

  function removeStep(index: number) {
    const steps = form.values.steps.filter((_, i) => i !== index);
    form.setFieldValue("steps", steps);
    inputRefs.current.splice(index, 1); // Remove the corresponding ref
  }

  async function onSubmit(updatedQuest: UpdateQuest) {
    try {
      // Handle quest update logic here, e.g., API call
      form.reset();
      close();
    } catch (error) {
      console.error("Failed to update quest:", error);
    }
  }

  console.log(questDetails.partyMembers);

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

        {form.values.steps.map((step: QuestStep, index: number) => (
          <TextInput
            key={step.id}
            label={`Step ${index + 1}`}
            placeholder={`Describe step ${index + 1}`}
            value={step.description}
            onChange={(e) => updateStep(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
            rightSection={
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => removeStep(index)}
              >
                <Trash2 size={18} />
              </ActionIcon>
            }
          />
        ))}

        <Button variant="light" color="violet" w={100} onClick={addStep}>
          Add Step
        </Button>

        <UpdatePriorityLevelSelect form={form} />
        <UpdatePartyMemberSelect
          partyMembers={questDetails.partyMembers}
          assignedMembers={questDetails.assignedMembers}
          form={form}
        />
        <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />

        <Button variant="light" color="violet" w={200} type="submit">
          Update Quest
        </Button>
      </Stack>
    </form>
  );
}

export default UpdateQuestForm;
