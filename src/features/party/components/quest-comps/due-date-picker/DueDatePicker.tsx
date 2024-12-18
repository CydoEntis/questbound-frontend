import { DateInput } from "@mantine/dates";
import { useEffect } from "react";

type DueDatePickerProps = {
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void; // Allow null
};

function DueDatePicker({ dueDate, setDueDate }: DueDatePickerProps) {
  useEffect(() => {
    if (dueDate && dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate, setDueDate]);

  return (
    <DateInput
      classNames={{
        input: "input",
      }}
      value={dueDate}
      onChange={(value) => setDueDate(value)}
      label="Due Date"
      minDate={new Date()}
      placeholder="Select due date"
    />
  );
}

export default DueDatePicker;
