import { ActionIcon, Flex, Select, TextInput } from "@mantine/core";
import { X } from "lucide-react";

type PartyMemberSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: "currentLevel" | "username" | "role";
  setSortBy: (value: "currentLevel" | "username" | "role") => void;
  sortOrder: "desc" | "asc";
  setSortOrder: (value: "desc" | "asc") => void;
  resetFilters: () => void;
};

function PartyMemberSearch({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  resetFilters,
}: PartyMemberSearchProps) {
  return (
    <Flex gap={8} align="end" mb="sm" w="100%">
      <TextInput
        classNames={{
          input: "input",
        }}
        label="Search"
        placeholder="Search by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        w="40%"
      />

      <Select
        classNames={{
          input: "input",
        }}
        label="Sort By"
        value={sortBy}
        onChange={(value) =>
          setSortBy(value as "currentLevel" | "username" | "role")
        }
        data={[
          { label: "Username", value: "username" },
          { label: "Level", value: "currentLevel" },
          { label: "Role", value: "role" },
        ]}
      />
      <Select
        classNames={{
          input: "input",
        }}
        label="Sort Order"
        value={sortOrder}
        onChange={(value) => setSortOrder(value as "asc" | "desc")}
        data={[
          { label: "Ascending", value: "asc" },
          { label: "Descending", value: "desc" },
        ]}
      />
      <ActionIcon
        onClick={resetFilters}
        variant="light"
        color="red"
        size="lg"
        mb={1}
      >
        <X size={20} />
      </ActionIcon>
    </Flex>
  );
}

export default PartyMemberSearch;
