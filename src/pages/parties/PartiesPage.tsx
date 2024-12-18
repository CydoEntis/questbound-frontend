import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Box,
  Flex,
  Group,
  Pagination,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { useGetParties } from "../../features/party/api/party";
import PartyGrid from "../../features/party/components/party-comps/party-grid/PartyGrid";
import { Route } from "../../routes/_authenticated/parties/";
import PartySearch from "../../features/party/components/party-comps/party-search/PartySearch";
import DateRangePicker from "../../components/date-pickers/DateRangePicker";
import PartySortMenu from "../../features/party/components/party-comps/party-sort/PartySortMenu";
import PartyOrderToggle from "../../features/party/components/party-comps/party-order/PartyOrderToggle";
import PartyDateRangePicker from "../../features/party/components/party-comps/date-range-picker/PartyDateRangePicker";

function PartiesPage() {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const navigate = useNavigate({ from: Route.fullPath });

  const currentPage = Number(searchParams.pageNumber) || 1;

  const queryParams = { ...searchParams, page: currentPage };

  const { data: parties, isPending, isError } = useGetParties(queryParams);

  const handlePageChange = (page: number) => {
    navigate({
      search: (prevSearch) => {
        return {
          ...prevSearch,
          pageNumber: page || 1,
        };
      },
    });
  };

  return (
    <>
      <PageHeader>
        <Title>Your Joined Parties</Title>
        <Flex align="end" justify="space-between">
          <Group align="end">
            <PartySearch />
            <PartySortMenu />
            <PartyDateRangePicker />
            <PartyOrderToggle />
          </Group>
        </Flex>
      </PageHeader>
      <Box p={32}>
        {isPending && (
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
            {Array.from({ length: 24 }).map((_, index) => (
              <Skeleton key={index} visible h={320} />
            ))}
          </SimpleGrid>
        )}

        {!isPending && isError && (
          <p>Error loading parties. Please try again later.</p>
        )}

        {!isPending && parties && (
          <>
            <PartyGrid parties={parties.items} />
            {parties.totalPages > 1 && (
              <Pagination
                pt={32}
                total={parties.totalPages} // Total number of pages
                value={currentPage} // Current page
                onChange={handlePageChange} // Page change handler
                color="violet"
              />
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default PartiesPage;
