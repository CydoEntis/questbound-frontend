import PageHeader from "../../../../../components/page/PageHeader";
import { Button, Flex, Group, Stack, Title, Text } from "@mantine/core";
import QuestOrderToggle from "../../quest-comps/quest-order/QuestOrderToggle";
import QuestDateRangePicker from "../../quest-comps/date-range-picker/QuestDateRangePicker";
import QuestSortMenu from "../../quest-comps/quest-sort/QuestSortMenu";
import QuestSearch from "../../quest-comps/quest-search/QuestSearch";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import PartyLeaderRequiredGuard from "../party-leader-required/PartyLeaderRequiredGuard";
import PartyMenu from "../party-menu/PartyMenu";
import LeaderOrCaptainOnlyGuard from "../leader-or-captain-guard/LeaderOrCaptainOnlyGuard";
import NewQuestButton from "../../quest-comps/new-quest-button/NewQuestButton";
import { Party } from "../../../shared/party.types";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";
import { User2, UserCog2 } from "lucide-react";
import ClearFilters from "../../../../../components/clear-filters/ClearFilters";

type PartyHeaderProps = {
  party: Party;
  deleteHandler: () => void;
  editHandler: () => void;
  partyManagementHandler: () => void;
  newQuestHandler: () => void;
};

function PartyHeader({
  party,
  deleteHandler,
  editHandler,
  partyManagementHandler,
  newQuestHandler
}: PartyHeaderProps) {
  return (
    <PageHeader>
      <Flex w="100%" justify="space-between">
        <Group>
          <Stack gap={4}>
            <Group align="center">
              <Title size="2.5rem">{party.name}</Title>
              <PartyLeaderRequiredGuard memberRole={party.currentUserRole}>
                <PartyMenu onDelete={deleteHandler} onEdit={editHandler} />
              </PartyLeaderRequiredGuard>
            </Group>
            <Text>{party.description}</Text>
          </Stack>
        </Group>
        <LeaderOrCaptainOnlyGuard memberRole={party.currentUserRole}>
          <NewQuestButton onOpen={newQuestHandler} />
        </LeaderOrCaptainOnlyGuard>
      </Flex>
      <Flex py={16}>
        <Group align="end" gap={8}>
          <Stack gap={4}>
            <Text>Party Members</Text>
            <AvatarList
              partyMembers={party.partyMembers}
              totalMembers={party.totalPartyMembers}
            />
          </Stack>
          <Button
            leftSection={
              party.currentUserRole === MEMBER_ROLES.MEMBER ? (
                <User2 size={20} />
              ) : (
                <UserCog2 size={20} />
              )
            }
            color="violet"
            variant="light"
            onClick={partyManagementHandler}
          >
            {party.currentUserRole === MEMBER_ROLES.MEMBER
              ? "View Members"
              : "Manage"}
          </Button>
        </Group>
      </Flex>
      <Flex align="end" justify="space-between">
        <Group align="end">
          <QuestSearch />
          <QuestSortMenu />
          <QuestDateRangePicker />
          <QuestOrderToggle />
          <ClearFilters />
        </Group>
      </Flex>
    </PageHeader>
  );
}

export default PartyHeader;
