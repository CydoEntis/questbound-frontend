import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../../routes/_authenticated/parties/index";
import { useForm, zodResolver } from "@mantine/form";
import { SearchTerm } from "../shared/party.types";
import { searchSchema } from "../shared/party.schemas";
import { ActionIcon, Group, Stack, TextInput, Text, Button } from "@mantine/core";
import { Search, X } from "lucide-react";
type Props = {};

function PartySearch({}: Props) {
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
    console.log(result);

    if (result.success) {
      navigate({
        search: (prevSearch) => ({
          ...prevSearch,
          searchTerm: result.data.search,
        }),
      });
    } else {
      console.log("Validation failed", result.error.errors);
    }
  };

  const resetSearch = () => {
    form.setFieldValue("searchTerm", "");
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        searchTerm: "",
      }),
    });
    handleSearch({ searchTerm: "" });
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
            {...form.getInputProps("searchTerm")}
            placeholder="Search by title"
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
