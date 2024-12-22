import {
  Box,
  Button,
  Flex,
  Group,
  Pagination,
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
import { UserCog2 } from "lucide-react";
import NewQuestButton from "./components/quest-comps/new-quest-button/NewQuestButton";
import { useDisclosure } from "@mantine/hooks";
import { useGetPartyQuests } from "./api/quest";

import QuestGrid from "./components/quest-comps/quest-grid/QuestGrid";
import CreateQuestModal from "./components/quest-comps/create-quest-modal/CreateQuestModal";

import QuestSearch from "./components/quest-comps/quest-search/QuestSearch";
import QuestSortMenu from "./components/quest-comps/quest-sort/QuestSortMenu";
import QuestOrderToggle from "./components/quest-comps/quest-order/QuestOrderToggle";
import QuestDateRangePicker from "./components/quest-comps/date-range-picker/QuestDateRangePicker";
import { useNavigate, useSearch } from "@tanstack/react-router";
import PartyMenu from "./components/party-comps/party-menu/PartyMenu";
import useUserStore from "../../stores/useUserStore";
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

  const { userId } = useUserStore();

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

  const memberRole = party.partyMembers.find(
    (member) => member.userId === userId
  )?.role;

  console.log(memberRole);

  return (
    <>
      <CreateQuestModal
        partyMembers={party.partyMembers}
        isOpened={opened}
        onClose={close}
      />
      {/* <EditPartyModal
        party={party}
        isOpened={editPartyOpened}
        onClose={closeEditParty}
      /> */}
      <PageHeader>
        <Flex w="100%" justify="space-between">
          <Group>
            <Stack gap={4}>
              <Group align="center">
                <Title size="2.5rem">{party.name}</Title>
                {memberRole === MEMBER_ROLES.CREATOR && (
                  <PartyMenu
                    onDelete={deletePartyHandler}
                    onEdit={openEditParty}
                  />
                )}
              </Group>
              <Text>{party.description}</Text>
            </Stack>
          </Group>
          <NewQuestButton onOpen={open} />
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
              leftSection={<UserCog2 size={20} />}
              color="violet"
              variant="light"
            >
              Manage
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
        {!isPending && quests && quests.items.length > 0 && (
          <>
            <QuestGrid quests={quests.items} />
            {quests.totalPages > 1 && (
              <Pagination
                pt={32}
                total={quests.totalPages} // Total number of pages
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

export default PartyPage;
