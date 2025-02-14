import { ActionIcon, Tooltip } from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties";

function PartyOrderToggle() {
  const navigate = useNavigate({ from: Route.fullPath });

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const updateOrder = (order: string) => {
    navigate({
      to: Route.fullPath,
      search: (prevSearch) => ({
        ...prevSearch,
        orderBy: order,
      }),
      replace: false,
    });
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    updateOrder(order);
  };

  return (
    <Tooltip label="Order By">
      <ActionIcon
        size="lg"
        variant="light"
        color="violet"
        onClick={toggleOrder}
      >
        {order === "asc" ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </ActionIcon>
    </Tooltip>
  );
}

export default PartyOrderToggle;
