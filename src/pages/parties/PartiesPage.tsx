import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ActionIcon,
  Box,
  Text,
  Flex,
  Group,
  Pagination,
  SimpleGrid,
  Skeleton,
  Menu,
  Button,
  Stack,
  Checkbox,
} from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { useDisclosure } from "@mantine/hooks";
import { useGetParties } from "../../features/party/api/party";
import PartyFilter from "../../features/party/party-filter/PartyFilter";
import PartyGrid from "../../features/party/party-grid/PartyGrid";
import { Route } from "../../routes/_authenticated/parties/";
import { Filter, Settings2 } from "lucide-react";
import SearchBar from "../../components/search/SearchBar";
import PartySearch from "../../features/party/party-search/PartySearch";
import SortMenu from "../../components/sort/SortMenu";
import OrderToggle from "../../components/order/OrderToggle";
import DateRangePicker from "../../components/date-pickers/DateRangePicker";

type Props = {};

function PartiesPage({}: Props) {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const navigate = useNavigate({ from: Route.fullPath });

  const currentPage = Number(searchParams.pageNumber) || 1;

  const queryParams = { ...searchParams, page: currentPage };

  const { data: parties, isPending, isError } = useGetParties(queryParams);

  const [isFilterOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure(false);



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
      <PartyFilter
        filterOpened={isFilterOpened}
        handleCloseFilterModal={closeFilters}
      />
      <PageHeader title="Joined Parties">
        <Flex align="end" justify="space-between">
          <Group align="end">
            <PartySearch />
            <SortMenu />
            <DateRangePicker />
            <OrderToggle />

            {/* <ActionIcon
              size="lg"
              variant="light"
              color="violet"
              onClick={openFilters}
            >
              <Settings2 size={20} />
            </ActionIcon> */}
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
