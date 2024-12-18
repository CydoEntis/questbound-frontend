import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";

type Props = {};

function DueDatePicker({}: Props) {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (dueDate && dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  return (
    <DateInput
      value={dueDate}
      onChange={setDueDate}
      label="Due Date"
      minDate={new Date()}
      placeholder="Select due date"
    />
  );
}

export default DueDatePicker;
