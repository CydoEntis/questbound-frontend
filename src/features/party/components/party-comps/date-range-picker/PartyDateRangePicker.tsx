import { DatePickerInput } from "@mantine/dates";
import { Group, Text, ActionIcon, Button } from "@mantine/core";
import { CalendarRange, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated";
import { useForm, zodResolver } from "@mantine/form";
import { dateFilterSchema } from "../../../../../shared/schemas";
import { DateFilter } from "../../../../../shared/types";

function PartyDateRangePicker() {
  const [value, setValue] = useState<[Date | null, Date | null] | undefined>(
    undefined
  );

  const useSearchParams = useSearch({
    from: "/_authenticated/parties/",
  });

  const navigate = useNavigate({ from: Route.fullPath });

  const form = useForm<DateFilter>({
    validate: zodResolver(dateFilterSchema),
    initialValues: {
      startDate: useSearchParams.startDate || "",
      endDate: useSearchParams.endDate || "",
    },
  });

  const handleFilterDates = (
    updatedValue: [Date | null, Date | null] | undefined
  ) => {
    if (updatedValue) {
      const [startDate, endDate] = updatedValue;

      if (startDate) startDate.setHours(0, 0, 0, 0);

      if (endDate) endDate.setHours(23, 59, 59, 999);

      setValue([startDate, endDate]);
      form.setFieldValue("startDate", startDate ? startDate.toISOString() : "");
      form.setFieldValue("endDate", endDate ? endDate.toISOString() : "");
    }
  };

  const handleSubmit = (dates: DateFilter) => {
    const result = dateFilterSchema.safeParse(dates);

    if (result.success) {
      navigate({
        to: Route.fullPath,
        search: (prevSearch) => ({
          ...prevSearch,
          startDate: result.data.startDate || undefined,
          endDate: result.data.endDate || undefined,
        }),
        replace: false,
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

export default PartyDateRangePicker;
