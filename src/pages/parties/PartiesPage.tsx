import { useSearch } from "@tanstack/react-router";
import { useGetParties } from "../../features/party/api/parties";
import PartyGrid from "../../features/party/party-grid/PartyGrid";
import usePartyStore from "../../stores/usePartyStore";
import { useEffect } from "react";

type Props = {};

function PartiesPage({}: Props) {
  // Access search parameters using TanStack Router's `useSearch` with the correct route ID
  const searchParams = useSearch({ from: "/_authenticated/parties/" }); // Use the `Route.id` to access search params

  const { setParties } = usePartyStore();

  // Extract query parameters from TanStack Router
  const queryParams = searchParams; // `searchParams` is already an object

  // Fetch parties using the queryParams
  const { data: parties, isLoading, isError } = useGetParties(queryParams);

  // Sync fetched parties to Zustand store
  useEffect(() => {
    if (parties) {
      setParties(parties); // Store in global state
    }
  }, [parties, setParties]);

  // Handle different states
  if (isLoading) {
    return <p>Loading parties...</p>; // Render loading placeholder
  }

  if (isError) {
    return <p>Error loading parties. Please try again later.</p>; // Render error message
  }

  if (!parties || parties.items.length === 0) {
    return <p>No parties found.</p>; // Handle empty state
  }

  // Render PartyGrid with the fetched parties
  return <PartyGrid parties={parties.items} />;
}

export default PartiesPage;
