import { useSearch } from "@tanstack/react-router";
import usePartyStore from "../../stores/usePartyStore";
import { useEffect } from "react";
import { ActionIcon, Box, Flex, Group } from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { Settings2 } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useGetParties } from "../../features/parties-a/api/parties";
import PartyFilter from "../../features/parties-a/party-filter/PartyFilter";
import PartyGrid from "../../features/parties-a/party-grid/PartyGrid";

type Props = {};

function PartiesPage({}: Props) {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const { setParties } = usePartyStore();
  const queryParams = searchParams;
  const { data: parties, isLoading, isError } = useGetParties(queryParams);

  const [isFilterOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);

  useEffect(() => {
    if (parties) {
      setParties(parties);
    }
  }, [parties, setParties]);

  if (isLoading) {
    return (
      <>
        <p>Loading parties...</p>
      </>
    );
  }

  if (isError) {
    return <p>Error loading parties. Please try again later.</p>;
  }

  if (!parties || parties.items.length === 0) {
    return <p>No parties found.</p>;
  }

  return (
    <>
      <PartyFilter
        filterOpened={isFilterOpened}
        handleCloseFilterModal={closeFilters}
      />
      <PageHeader title="Joined Parties">
        <Flex align="end" justify="space-between">
          <Group align="end">
            <ActionIcon
              size="lg"
              variant="light"
              color="violet"
              onClick={openFilters}
            >
              <Settings2 size={20} />
            </ActionIcon>
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
