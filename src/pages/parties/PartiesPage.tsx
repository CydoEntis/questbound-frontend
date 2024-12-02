import { useSearch } from "@tanstack/react-router";
import { useGetParties } from "../../features/party/api/parties";
import PartyGrid from "../../features/party/party-grid/PartyGrid";
import usePartyStore from "../../stores/usePartyStore";
import { useEffect } from "react";
import { ActionIcon, Box, Flex, Group } from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { Settings2 } from "lucide-react";
import FilterModal from "../../components/filter/FIlterModal";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

function PartiesPage({}: Props) {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const { setParties } = usePartyStore();
  const queryParams = searchParams;
  const { data: parties, isLoading, isError } = useGetParties(queryParams);


  const sortOptions = [
    { label: "Title", value: "title" },
    { label: "Created At", value: "created-at" },
    { label: "Updated At", value: "updated-at" },
  ];

  const dateOptions = [
    { label: "Created On", value: "created-at" },
    { label: "Updated On", value: "updated-at" },
  ];

  const orderOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  const [isFilterOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);

  useEffect(() => {
    if (parties) {
      setParties(parties);
    }
  }, [parties, setParties]);

  if (isLoading) {
    return <p>Loading parties...</p>;
  }

  if (isError) {
    return <p>Error loading parties. Please try again later.</p>;
  }

  if (!parties || parties.items.length === 0) {
    return <p>No parties found.</p>;
  }



  return (
    <>
      <FilterModal
        filterOpened={isFilterOpened}
        sortOptions={sortOptions}
        dateOptions={dateOptions}
        orderOptions={orderOptions}
        handleCloseFilterModal={closeFilters}
        // onApplyFilters={handleApplyFilters}
        // onClearFilters={handleClearFilters}
      />
      <PageHeader title="Joined Parties">
        <Flex align="end" justify="space-between">
          {/* <SearchBar
            form={form}
            onSearch={handleSearchSubmit}
            onClear={resetSearchAndFetch}
            resetCallback={(reset) => {
              callbacksRef.current.search = reset;
            }}
          /> */}
          <Group align="end">
            <ActionIcon
              size="lg"
              variant="light"
              color="violet"
                onClick={openFilters}
            >
              <Settings2 size={20} />
            </ActionIcon>
            {/* <LayoutOptions /> */}
          </Group>
        </Flex>
      </PageHeader>
      <Box p={32}>
        <PartyGrid parties={parties.items} />
      </Box>
    </>
  );
}

export default PartiesPage;
