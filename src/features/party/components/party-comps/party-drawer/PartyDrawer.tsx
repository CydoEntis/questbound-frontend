import { Box, Drawer, Title } from "@mantine/core";

import { Party } from "../../../shared/party.types";
import UpsertPartyForm from "../party-form/CreatePartyForm";

type PartyDrawerProps = {
  isOpened: boolean;
  onClose: () => void;
  party?: Party;
  drawerMode: "create" | "edit";
};

function PartyDrawer({
  isOpened,
  onClose,
  drawerMode,
  party,
}: PartyDrawerProps) {
  return (
    <Drawer size="xl" opened={isOpened} onClose={onClose} position="right">
      <Box px={32} h="100%">
        <Title size="2rem">
          {drawerMode === "create"
            ? "Create a Party"
            : `Editing: ${party?.name} `}
        </Title>
        <UpsertPartyForm onClose={onClose} />
      </Box>
    </Drawer>
  );
}

export default PartyDrawer;
