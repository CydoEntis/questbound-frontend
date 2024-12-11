import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../routes/_auth";
import { z } from "zod";

type FilterModalProps = {
  filterOpened: boolean;
  handleCloseFilterModal: () => void;
  sortOptions?: Array<{ label: string; value: string }>;
  dateOptions?: Array<{ label: string; value: string }>;
  orderOptions?: Array<{ label: string; value: string }>;
};

function FilterModal({
  filterOpened,
  handleCloseFilterModal,
  sortOptions,
  dateOptions,
  orderOptions,
}: FilterModalProps) {
  const { sortField, dateFilterField } = useSearch({
    from: "/_authenticated/parties/",
  });

  const navigate = useNavigate({ from: Route.fullPath });

  const filterFormSchema = z.object({
    sortBy: z.string(),
    filterDate: z.string(),
  });

  type FilterFormValues = z.infer<typeof filterFormSchema>;

  const form = useForm<FilterFormValues>({
    validate: zodResolver(filterFormSchema),
    initialValues: {
      sortBy: sortField ?? "title",
      filterDate: dateFilterField ?? "created-at",
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
          dateFilterField: result.data.filterDate,
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
          {/* Sort Options */}
          {sortOptions && (
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
          )}

          {/* Date Options */}
          {dateOptions && (
            <Stack py={8}>
              <Text>Date</Text>
              <Divider />
              {dateOptions.map(({ label, value }) => (
                <Checkbox
                  key={value}
                  checked={form.values.filterDate === value}
                  onChange={() => updateFilters("filterDate", value)}
                  label={label}
                />
              ))}
            </Stack>
          )}

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

export default FilterModal;
