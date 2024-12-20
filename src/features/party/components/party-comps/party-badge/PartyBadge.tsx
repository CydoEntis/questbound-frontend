import { Badge } from "@mantine/core";
import { Party } from "../../../shared/party.types";

type PartyBadgeProps = {
  party: Party;
};

function PriorityBadge({ party }: PartyBadgeProps) {
  // Explicitly define the map with numeric keys
  const priorityMap: Record<number, { color: string; text: string }> = {
    1: { color: "blue", text: "Low" },
    2: { color: "yellow", text: "Medium" },
    3: { color: "orange", text: "High" },
    4: { color: "red", text: "Critical" },
  };

  // Access the mapping
  const { color, text } = priorityMap[priorityLevel] || {
    color: "gray",
    text: "Unknown",
  };

  return (
    <Badge variant="light" color={color}>
      {text}
    </Badge>
  );
}

export default PriorityBadge;
