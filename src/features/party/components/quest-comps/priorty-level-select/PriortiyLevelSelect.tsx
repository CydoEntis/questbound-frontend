import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { NewQuest } from "../../../shared/quest.types";

type Props = {
  form: UseFormReturnType<NewQuest>;
};

function PriorityLevelSelect({ form }: Props) {
  return (
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
  );
}

export default PriorityLevelSelect;
