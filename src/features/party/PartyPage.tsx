import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Pagination,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { useDeleteParty, useGetPartyDetails } from "./api/party";
import { Route } from "../../routes/_authenticated/parties/$partyId";
import AvatarList from "../avatar/components/avatar-list/AvatarList";
import { User2, UserCog2 } from "lucide-react";
import NewQuestButton from "./components/quest-comps/new-quest-button/NewQuestButton";
import { useDisclosure } from "@mantine/hooks";
import { useGetPartyQuests } from "./api/quest";

import QuestGrid from "./components/quest-comps/quest-grid/QuestGrid";
import CreateQuestModal from "./components/quest-comps/create-quest-modal/CreateQuestModal";

import QuestSearch from "./components/quest-comps/quest-search/QuestSearch";
import QuestSortMenu from "./components/quest-comps/quest-sort/QuestSortMenu";
import QuestOrderToggle from "./components/quest-comps/quest-order/QuestOrderToggle";
import QuestDateRangePicker from "./components/quest-comps/date-range-picker/QuestDateRangePicker";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import PartyMenu from "./components/party-comps/party-menu/PartyMenu";
import UpdatePartyModal from "./components/party-comps/update-party-modal/UpdatePartyModal";
import PartyManagementModal from "./components/party-comps/party-management/PartyManagementModal";
import PartyLeaderRequiredGuard from "./components/party-comps/party-leader-required/PartyLeaderRequiredGuard";
import LeaderOrCaptainOnlyGuard from "./components/party-comps/leader-or-captain-guard/LeaderOrCaptainOnlyGuard";
import { MEMBER_ROLES } from "../../shared/utils/constants";

function PartyPage() {
  const searchParams = useSearch({ from: "/_authenticated/parties/$partyId" });
  const navigate = useNavigate({ from: Route.fullPath });
  const deleteParty = useDeleteParty();

  const { partyId } = Route.useParams();
  const currentPage = Number(searchParams.pageNumber) || 1;
  const queryParams = { ...searchParams, page: currentPage };

  const {
    data: party,
    isPending,
    isError,
  } = useGetPartyDetails(Number(partyId), { enabled: true });
  const {
    data: quests,
    // isPending: isQuestsPending,
    // isError: isQuestsError,
  } = useGetPartyQuests(Number(partyId), queryParams);

  const handlePageChange = (page: number) => {
    navigate({
      search: (prevSearch) => {
        return {
          ...prevSearch,
          pageNumber: page || 1,
        };
      },
      replace: false,
    });
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [editPartyOpened, { open: openEditParty, close: closeEditParty }] =
    useDisclosure(false);
  const [
    partyManagementOpened,
    { open: openPartyManagement, close: closePartyManagement },
  ] = useDisclosure(false);

  const deletePartyHandler = async () => {
    try {
      await deleteParty.mutateAsync(Number(partyId));
      closeEditParty();
      navigate({ to: "/parties", search: { pageNumber: 1 } });
    } catch (error) {
      console.error("Failed to delete party:", error);
    }
  };

  if (isPending && !party) return <div>Loading...</div>;
  if (isError) return <div>Something broken...</div>;

  console.log(party.currentUserRole);

  return (
    <>
      <CreateQuestModal
        partyMembers={party.partyMembers}
        isOpened={opened}
        onClose={close}
      />
      <UpdatePartyModal
        partyId={party.id}
        isOpened={editPartyOpened}
        onClose={closeEditParty}
      />
      <PartyManagementModal
        isOpened={partyManagementOpened}
        onClose={closePartyManagement}
        partyId={party.id}
        memberRole={party.currentUserRole}
      />

      <PageHeader>
        <Flex w="100%" justify="space-between">
          <Group>
            <Stack gap={4}>
              <Group align="center">
                <Title size="2.5rem">{party.name}</Title>
                <PartyLeaderRequiredGuard memberRole={party.currentUserRole}>
                  <PartyMenu
                    onDelete={deletePartyHandler}
                    onEdit={openEditParty}
                  />
                </PartyLeaderRequiredGuard>
              </Group>
              <Text>{party.description}</Text>
            </Stack>
          </Group>
          <LeaderOrCaptainOnlyGuard memberRole={party.currentUserRole}>
            <NewQuestButton onOpen={open} />
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
              onClick={openPartyManagement}
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
        {!isPending && !quests && (
          <Center>
            <Paper p={32} withBorder>
              <Stack align="center">
                <Title>UH OH!</Title>
                <Text size="xl">
                  You haven't been assigned to any quests yet 👀
                </Text>
                <Text size="xs" c="dimmed">
                  Please contact your party leader
                </Text>
                <Anchor
                  component={Link}
                  to="/parties"
                  size="sm"
                  c="violet"
                  variant="link"
                >
                  View All Parties
                </Anchor>
              </Stack>
            </Paper>
          </Center>
        )}
        {!isPending && quests && quests.items.length > 0 && (
          <>
            <QuestGrid quests={quests.items} />
            {quests.totalPages > 1 && (
              <Pagination
                pt={32}
                total={quests.totalPages}
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

export default PartyPage;
