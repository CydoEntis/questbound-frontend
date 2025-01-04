import {
  Anchor,
  Box,
  Center,
  Container,
  Pagination,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useDeleteParty, useGetPartyDetails } from "./api/party";
import { Route } from "../../routes/_authenticated/parties/$partyId";
import { useDisclosure } from "@mantine/hooks";
import { useGetPartyQuests } from "./api/quest";
import QuestGrid from "./components/quest-comps/quest-grid/QuestGrid";
import CreateQuestModal from "./components/quest-comps/create-quest-modal/CreateQuestModal";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import UpdatePartyModal from "./components/party-comps/update-party-modal/UpdatePartyModal";
import PartyManagementModal from "./components/party-comps/party-management/PartyManagementModal";
import PartyHeader from "./components/party-comps/party-header/PartyHeader";
import QuestsLoadingSkeleton from "./components/quest-comps/quest-loading/QuestsLoadingSkeleton";
import NoQuestsAssigned from "./components/quest-comps/no-quests/NoQuestsAssigned";
import PartiesPageLoadingSkeleton from "./components/party-comps/parties-loader/PartiesPageLoadingSkeleton";

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
  const { data: quests, isPending: isQuestsPending } = useGetPartyQuests(Number(partyId), queryParams);

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

  const [newQuestOpened, { open: openNewQuest, close: closeNewQuest }] =
    useDisclosure(false);
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

  if (isPending && !party) return <PartiesPageLoadingSkeleton />;

  if (isError)
    return (
      <Container p={32}>
        <Center>
          <Paper p={32} withBorder bg="card">
            <Stack justify="center" align="center">
              <Title>Unexpected Error Has Occured</Title>
              <Anchor
                component={Link}
                to="/dashboard"
                size="sm"
                c="violet"
                variant="link"
              >
                Return to Dashboard
              </Anchor>
            </Stack>
          </Paper>
        </Center>
      </Container>
    );

  return (
    <>
      <CreateQuestModal
        partyMembers={party.partyMembers}
        isOpened={newQuestOpened}
        onClose={closeNewQuest}
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

      <PartyHeader
        party={party}
        deleteHandler={deletePartyHandler}
        editHandler={openEditParty}
        partyManagementHandler={openPartyManagement}
        newQuestHandler={openNewQuest}
      />
      <Box p={32}>
        {isQuestsPending && !quests && <QuestsLoadingSkeleton />}
        {!isQuestsPending && quests && quests.items.length === 0 && (
          <NoQuestsAssigned />
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
