import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { UpdateQuest } from "../../../shared/quest.types";

type Props = {
  form: UseFormReturnType<UpdateQuest>;
};

function UpdatePriorityLevelSelect({ form }: Props) {
  return (
    <NativeSelect
      classNames={{
        input: "input",
      }}
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

export default UpdatePriorityLevelSelect;
