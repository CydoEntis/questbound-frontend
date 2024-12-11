import { DatePickerInput } from "@mantine/dates";
import { Group, Text, ActionIcon, Input } from "@mantine/core";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

type DateRangePickerProps = {
  onDateChange: (startDate: string, endDate: string) => void;
  resetCallback?: (resetFunction: () => void) => void;
};

function DateRangePicker({
  onDateChange,
  resetCallback,
}: DateRangePickerProps) {
  const [value, setValue] = useState<[Date | null, Date | null] | undefined>();

  const handleFilterDates = (
    updatedValue: [Date | null, Date | null] | undefined
  ) => {
    setValue(updatedValue); // Update the state with the new value
    const [startDate, endDate] = updatedValue || [null, null];
    const stringifiedStartDate = startDate ? startDate.toISOString() : "";
    const stringifiedEndDate = endDate ? endDate.toISOString() : "";
    onDateChange(stringifiedStartDate, stringifiedEndDate);
  };

  const resetDateRange = () => {
    setValue(undefined); // Reset the value to undefined
    onDateChange("", ""); // Notify parent about the reset
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="sm" mb={4}>
        Select a Date Range
      </Text>
      <Input.Wrapper>
        <Group>
          <DatePickerInput
            placeholder="Select date range"
            type="range"
            allowSingleDateInRange
            value={value}
            onChange={(updatedValue) => handleFilterDates(updatedValue)}
            style={{ flex: 1 }}
            leftSection={
              <ActionIcon
                size="lg"
                variant="light"
                color="violet"
                onClick={resetDateRange}
                style={{ marginLeft: 8 }}
              >
                <X />
              </ActionIcon>
            }
          />
        </Group>
      </Input.Wrapper>
    </form>
  );
}

export default DateRangePicker;
