import { useSearch } from "@tanstack/react-router";
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { Settings2 } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useGetParties } from "../../features/party/api/party";
import PartyFilter from "../../features/party/party-filter/PartyFilter";
import PartyGrid from "../../features/party/party-grid/PartyGrid";

type Props = {};

function PartiesPage({}: Props) {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const queryParams = searchParams;
  const { data: parties, isPending, isError } = useGetParties(queryParams);

  const [isFilterOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);

  // if (isPending) {
  //   return (
  //     <>
  //       <p>Loading parties...</p>
  //     </>
  //   );
  // }

  // if (isError) {
  //   return <p>Error loading parties. Please try again later.</p>;
  // }

  // if (!parties || parties.items.length === 0) {
  //   return <p>No parties found.</p>;
  // }
  const fakePending = true;
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
        {isPending ? (
          <SimpleGrid
            type="container"
            cols={{
              base: 1,
              "550px": 1,
              "725px": 2,
              "1000px": 3,
              "1700px": 4,
              "2000px": 6,
            }}
          >
            {isPending &&
              Array.from({ length: 24 }).map((_, index) => (
                <Skeleton key={index} visible h={320} />
              ))}
          </SimpleGrid>
        ) : (
          parties && <PartyGrid parties={parties.items} />
        )}
        {isError && <p>Error loading parties. Please try again later.</p>}
      </Box>
    </>
  );
}

export default PartiesPage;
