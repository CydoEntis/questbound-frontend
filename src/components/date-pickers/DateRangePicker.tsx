import { DatePickerInput } from "@mantine/dates";
import { Group, Text, ActionIcon, Button } from "@mantine/core";
import { CalendarRange, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../routes/_authenticated";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import styles from "./date-range-picker.module.css";

// Schema to validate the date filter
export const dateFilterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type DateFilter = z.infer<typeof dateFilterSchema>;

function DateRangePicker() {
  // State for the selected date range
  const [value, setValue] = useState<[Date | null, Date | null] | undefined>(
    undefined
  );

  // Access URL search parameters
  const useSearchParams = useSearch({
    from: "/_authenticated/parties/",
  });

  // Navigation function
  const navigate = useNavigate({ from: Route.fullPath });

  // Form management
  const form = useForm<DateFilter>({
    validate: zodResolver(dateFilterSchema),
    initialValues: {
      startDate: useSearchParams.startDate || "",
      endDate: useSearchParams.endDate || "",
    },
  });

  // Handle date selection changes
  const handleFilterDates = (
    updatedValue: [Date | null, Date | null] | undefined
  ) => {
    setValue(updatedValue); // Update state with selected dates
    const [startDate, endDate] = updatedValue || [null, null];
    form.setFieldValue("startDate", startDate ? startDate.toISOString() : "");
    form.setFieldValue("endDate", endDate ? endDate.toISOString() : "");
  };

  // Handle form submission
  const handleSubmit = (dates: DateFilter) => {
    const result = dateFilterSchema.safeParse(dates);

    if (result.success) {
      navigate({
        search: (prevSearch) => ({
          ...prevSearch,
          startDate: result.data.startDate || undefined,
          endDate: result.data.endDate || undefined,
        }),
      });
      console.log("Date range applied:", result.data);
    } else {
      console.log("Validation failed", result.error.errors);
    }
  };

  const reset = () => {
    setValue([null, null]); // Reset local state
    form.reset(); // Reset form fields
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        startDate: undefined,
        endDate: undefined,
      }),
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text size="sm" mb={4}>
        Select a Date Range
      </Text>
      <Group>
        <DatePickerInput
          w={320}
          type="range"
          placeholder="Select date range"
          value={value}
          onChange={handleFilterDates}
          classNames={{
            input: "input",
            day: "custom-date-picker-day",
          }}
          rightSection={
            value?.[0] || value?.[1] ? (
              <ActionIcon variant="light" color="violet" onClick={reset}>
                <X size={18} />
              </ActionIcon>
            ) : null
          }
        />

        <Button
          color="violet"
          type="submit"
          variant="light"
          leftSection={<CalendarRange size={20} />}
        >
          Filter
        </Button>
      </Group>
    </form>
  );
}

export default DateRangePicker;
