import { Button, Checkbox, Menu, Stack } from "@mantine/core";
import { ArrowDownUp } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties";

function PartySortMenu() {
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
      to: Route.fullPath,
      search: (prevSearch) => ({
        ...prevSearch,
        [key]: value,
      }),
      replace: false,
    });
  };

  const selectedSortBy = search.sortBy || "created-at";



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
            <Menu.Item key={value}>
              <Checkbox
                color="violet"
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

export default PartySortMenu;
