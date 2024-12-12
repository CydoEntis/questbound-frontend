import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties/index";
import DateRangePicker from "../../../../../components/date-pickers/DateRangePicker";

type FilterModalProps = {
  filterOpened: boolean;
  handleCloseFilterModal: () => void;
};

function PartyFilter({
  filterOpened,
  handleCloseFilterModal,
}: FilterModalProps) {
  const {
    sortField,
    // dateFilterField,
    orderDirection,
    startDate: initialStartDate,
    endDate: initialEndDate,
  } = useSearch({
    from: "/_authenticated/parties/",
  });

  const sortOptions = [
    { label: "Title", value: "title" },
    { label: "Created At", value: "created-at" },
    { label: "Updated At", value: "updated-at" },
  ];

  const orderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const navigate = useNavigate({ from: Route.fullPath });

  const filterFormSchema = z.object({
    sortBy: z.string(),
    orderDirection: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  });

  type FilterFormValues = z.infer<typeof filterFormSchema>;

  const form = useForm<FilterFormValues>({
    validate: zodResolver(filterFormSchema),
    initialValues: {
      sortBy: sortField ?? "title",
      // filterDate: dateFilterField ?? "created-at",
      orderDirection: orderDirection ?? "desc",
      startDate: initialStartDate ?? "",
      endDate: initialEndDate ?? "",
    },
  });

  const updateFilters = (name: keyof FilterFormValues, value: unknown) => {
    form.setValues({
      ...form.values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values = form.values;

    const result = filterFormSchema.safeParse(values);
    if (result.success) {
      navigate({
        search: (prevSearch) => ({
          ...prevSearch,
          sortField: result.data.sortBy,
          orderDirection: result.data.orderDirection,
          // dateFilterField: result.data.filterDate,
          startDate: result.data.startDate || undefined,
          endDate: result.data.endDate || undefined,
        }),
      });

      handleCloseFilterModal();
    } else {
      console.log("Validation failed", result.error.errors);
    }
  };

  const handleClearFilters = () => {
    form.reset();
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        sortField: undefined,
        dateFilterField: undefined,
        startDate: undefined,
        endDate: undefined,
      }),
    });
    handleCloseFilterModal();
  };


  return (
    <Modal
      opened={filterOpened}
      onClose={handleCloseFilterModal}
      centered
      title="Filters"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={8} w="100%">
          {/* Date Range Picker */}
          <DateRangePicker
            onDateChange={(startDate, endDate) => {
              form.setValues({
                ...form.values,
                startDate,
                endDate,
              });
            }}
            resetCallback={(resetFn) => {
              form.setValues({
                ...form.values,
                startDate: "",
                endDate: "",
              });
              resetFn();
            }}
          />

          <SimpleGrid cols={2}>
            {/* Sort Options */}
            <Stack py={8}>
              <Text>Sort</Text>
              <Divider />
              {sortOptions.map(({ label, value }) => (
                <Checkbox
                  key={value}
                  checked={form.values.sortBy === value}
                  onChange={() => updateFilters("sortBy", value)}
                  label={label}
                />
              ))}
            </Stack>

            {/* Order Options */}
            <Stack py={8}>
              <Text>Order</Text>
              <Divider />
              {orderOptions.map(({ label, value }) => (
                <Checkbox
                  key={value}
                  checked={form.values.orderDirection === value}
                  onChange={() => updateFilters("orderDirection", value)}
                  label={label}
                />
              ))}
            </Stack>
          </SimpleGrid>

          {/* Action Buttons */}
          <Flex gap={8}>
            <Button fullWidth color="violet" variant="light" type="submit">
              Apply Filters
            </Button>
            <Button
              fullWidth
              color="red"
              variant="light"
              type="button"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
}

export default PartyFilter;
