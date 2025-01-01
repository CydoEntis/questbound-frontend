import { ActionIcon } from "@mantine/core";
import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/_authenticated/parties/$partyId";

function ClearFilters() {
  const navigate = useNavigate({ from: Route.fullPath });

  const clearQueryParams = () => {
    navigate({
      search: (prevSearch) => ({
        ...prevSearch,
        search: undefined,
        orderBy: undefined,
        sortBy: undefined,
        dateFilter: undefined,
        pageNumber: 1,
        startDate: undefined,
        endDate: undefined,
        partyId: undefined,
      }),
    });
  };

  return (
    <ActionIcon
      variant="light"
      color="red"
      size="lg"
      onClick={clearQueryParams}
    >
      <X size={18} />
    </ActionIcon>
  );
}

export default ClearFilters;
