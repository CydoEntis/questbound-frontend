import { useNavigate, useSearch } from "@tanstack/react-router";
import { Box, Pagination } from "@mantine/core";
import { useGetParties } from "../../features/party/api/party";
import PartyGrid from "../../features/party/components/party-comps/party-grid/PartyGrid";
import { Route } from "../../routes/_authenticated/parties/";

import PartiesHeader from "../../features/party/components/party-comps/parties-header/PartiesHeader";
import PartiesLoadingSkeleton from "../../features/party/components/party-comps/parties-loader/PartiesLoadingSkeleton";

function PartiesPage() {
  const searchParams = useSearch({ from: "/_authenticated/parties/" });
  const navigate = useNavigate({ from: Route.fullPath });

  const currentPage = Number(searchParams.pageNumber) || 1;

  const queryParams = { ...searchParams, page: currentPage };

  const { data: parties, isPending, isError } = useGetParties(queryParams);

  const handlePageChange = (page: number) => {
    console.log("Navigating to:", Route.fullPath);
    navigate({
      to: Route.fullPath,
      search: (prevSearch) => {
        return {
          ...prevSearch,
          pageNumber: page || 1,
        };
      },
      replace: false,
    });
  };


  return (
    <>
      <PartiesHeader />
      <Box p={32}>
        {isPending && <PartiesLoadingSkeleton />}

        {!isPending && isError && (
          <p>Error loading parties. Please try again later.</p>
        )}

        {!isPending && parties && (
          <>
            <PartyGrid parties={parties.items} />
            {parties.totalPages > 1 && (
              <Pagination
                pt={32}
                total={parties.totalPages}
                value={currentPage}
                onChange={handlePageChange}
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
