import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties/index";
import { useForm, zodResolver } from "@mantine/form";
import { SearchTerm } from "../../../shared/party.types";
import { searchSchema } from "../../../shared/party.schemas";
import {
  ActionIcon,
  Group,
  Stack,
  TextInput,
  Text,
  Button,
} from "@mantine/core";
import { Search, X } from "lucide-react";

function PartySearch() {
  const useSearchParams = useSearch({
    from: "/_authenticated/parties/",
  });

  const navigate = useNavigate({ from: Route.fullPath });

  const form = useForm<SearchTerm>({
    validate: zodResolver(searchSchema),
    initialValues: {
      search: useSearchParams.search || "",
    },
  });

  const handleSearch = (search: SearchTerm) => {
    const result = searchSchema.safeParse(search);

    if (result.success) {
      navigate({
        to: Route.fullPath,
        search: (prevSearch) => ({
          ...prevSearch,
          search: result.data.search,
        }),
        replace: false,
      });
    }
  };

  const resetSearch = () => {
    form.setFieldValue("search", "");
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        search: undefined,
      }),
    });
    handleSearch({ search: undefined });
  };

  return (
    <form onSubmit={form.onSubmit(handleSearch)}>
      <Group gap={8} align="end">
        <Stack gap={2}>
          <Text size="sm">Search</Text>
          <TextInput
            leftSection={<Search size="20" />}
            classNames={{ input: "input" }}
            rightSection={
              form.values.search && (
                <ActionIcon
                  variant="light"
                  color="violet"
                  onClick={resetSearch}
                >
                  <X size={18} />
                </ActionIcon>
              )
            }
            {...form.getInputProps("search")}
            placeholder="Search by party name"
          />
        </Stack>
        <Button variant="light" color="violet" type="submit">
          Search
        </Button>
      </Group>
    </form>
  );
}

export default PartySearch;
