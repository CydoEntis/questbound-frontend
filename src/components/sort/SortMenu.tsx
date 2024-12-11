import { Button, Checkbox, Menu, Stack } from "@mantine/core";
import { ArrowDownUp } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../routes/_authenticated/parties";

type Props = {};

function SortMenu({}: Props) {
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Created At", value: "created-at" },
    { label: "Updated At", value: "updated-at" },
  ];

  const navigate = useNavigate({ from: Route.fullPath });

  const search = useSearch({
    from: "/_authenticated/parties/",
  });

  const updateFilters = (key: string, value: string) => {
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        sortBy: value,
      })
    });
  };

  const selectedSortBy = search.sortBy || ""; 

  console.log(selectedSortBy);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          size="sm"
          variant="light"
          color="violet"
          leftSection={<ArrowDownUp size={20} />}
        >
          Sort
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Filters</Menu.Label>
        <Stack py={8}>
          {sortOptions.map(({ label, value }) => (
            <Menu.Item>
              <Checkbox
                key={value}
                checked={selectedSortBy === value}
                onChange={() => updateFilters("sortBy", value)}
                label={label}
              />
            </Menu.Item>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}

export default SortMenu;
