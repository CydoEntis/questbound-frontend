import { TextInput, ActionIcon, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Trash2 } from "lucide-react";
import { NewQuest } from "../../../shared/quest.types";

type AddQuestStepProps = {
  form: UseFormReturnType<NewQuest>;
};

function AddQuestStep({ form }: AddQuestStepProps) {
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
    <>
      {(form.values.steps || []).map((step: string, index: number) => (
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
                  (_: string, i: number) => i !== index
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
    </>
  );
}

export default AddQuestStep;
