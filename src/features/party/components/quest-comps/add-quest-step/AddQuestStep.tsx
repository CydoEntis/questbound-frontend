import { TextInput, ActionIcon, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { NewQuest } from "../../../shared/quest.types";

type AddQuestStepProps = {
  form: UseFormReturnType<NewQuest>;
};

function AddQuestStep({ form }: AddQuestStepProps) {
  // Store refs for each step input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function addStep() {
    const steps = [...form.values.steps, ""];
    form.setFieldValue("steps", steps);

    // Allow React to update DOM, then focus the new input
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
    inputRefs.current.splice(index, 1); // Remove the corresponding ref
  }

  return (
    <>
      {(form.values.steps || []).map((step: string, index: number) => (
        <TextInput
          classNames={{
            input: "input",
          }}
          ref={(el) => (inputRefs.current[index] = el)} // Assign ref to input
          value={step}
          key={index}
          onChange={(e) => updateStep(index, e.target.value)}
          label={`Step ${index + 1}`}
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
