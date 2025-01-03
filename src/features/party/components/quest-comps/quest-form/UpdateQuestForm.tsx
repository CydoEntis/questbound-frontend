import {
  Button,
  Stack,
  Textarea,
  TextInput,
  ActionIcon,
  Text,
  Group,
} from "@mantine/core";
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
import { useUpdateQuest } from "../../../api/quest";
import { ErrorResponse } from "../../../../../api/errors/error.types";
import useFormErrorHandler from "../../../../../shared/hooks/useHandleErrors";

type UpdateQuestFormProps = {
  questDetails: QuestDetail; // The quest object to update
  close: () => void;
  onCancel: () => void;
};

function UpdateQuestForm({
  questDetails,
  close,
  onCancel,
}: UpdateQuestFormProps) {
  const updateQuest = useUpdateQuest();
  const { handleFormErrors } = useFormErrorHandler<UpdateQuest>();

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
      assignedPartyMembers:
        questDetails.assignedMembers.map((member) => member.userId) || [],
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
      { description: "", isCompleted: false },
    ];
    form.setFieldValue("steps", steps);

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
    inputRefs.current.splice(index, 1);
  }

  const handleEditFormClose = () => {
    form.reset();
    setDueDate(null);
    close();
  };

  async function onSubmit(updatedQuest: UpdateQuest) {
    try {
      console.log("Updated quest:", updatedQuest);

      await updateQuest.mutateAsync({
        questId: questDetails.id,
        updateQuest: updatedQuest,
      });
      handleEditFormClose();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
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

        <Stack gap={8}>
          {form.values.steps.length > 0 && <Text>Steps</Text>}
          {form.values.steps.map((step: QuestStep, index: number) => (
            <TextInput
              classNames={{
                input: "input",
              }}
              key={index}
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
        </Stack>

        <Button variant="light" color="violet" w={100} onClick={addStep}>
          Add Step
        </Button>

        <UpdatePriorityLevelSelect form={form} />
        <UpdatePartyMemberSelect
          partyMembers={questDetails.partyMembers}
          assignedMembers={questDetails.assignedMembers}
          form={form}
        />
        <DueDatePicker
          dueDate={dueDate}
          setDueDate={(date) => {
            setDueDate(date);
            form.setFieldValue("dueDate", date!);
          }}
        />

        <Group gap={8} justify="end">
          <Button variant="light" color="violet" w={200} type="submit">
            Update Quest
          </Button>
          <Button
            variant="light"
            color="dimmed"
            w={200}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateQuestForm;
