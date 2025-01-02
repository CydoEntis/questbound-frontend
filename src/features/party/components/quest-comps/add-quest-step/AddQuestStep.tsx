import { TextInput, ActionIcon, Button, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { NewQuest } from "../../../shared/quest.types";

type AddQuestStepProps = {
  form: UseFormReturnType<NewQuest>;
};

function AddQuestStep({ form }: AddQuestStepProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function addStep() {
    const steps = [...form.values.steps, ""];
    form.setFieldValue("steps", steps);

    setTimeout(() => {
      inputRefs.current[steps.length - 1]?.focus();
    }, 0);
  }

  function updateStep(index: number, value: string) {
    const steps = [...form.values.steps];
    steps[index] = value;
    form.setFieldValue("steps", steps);
  }

  function removeStep(index: number) {
    const steps = (form.values.steps || []).filter((_, i) => i !== index);
    form.setFieldValue("steps", steps);
    inputRefs.current.splice(index, 1);
  }

  return (
    <>
      <Text size="sm">Quest Steps</Text>
      {(form.values.steps || []).map((step: string, index: number) => (
        <TextInput
          classNames={{
            input: "input",
          }}
          ref={(el) => (inputRefs.current[index] = el)}
          value={step}
          key={index}
          onChange={(e) => updateStep(index, e.target.value)}
          placeholder={`Describe step ${index + 1}`}
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
    </>
  );
}

export default AddQuestStep;
