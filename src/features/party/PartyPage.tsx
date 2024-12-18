import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Pagination,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
  Badge,
  Progress,
} from "@mantine/core";
import PageHeader from "../../components/page/PageHeader";
import { useGetParties, useGetPartyDetails } from "./api/party";
import { Route } from "../../routes/_authenticated/parties/$partyId";
import AvatarList from "../avatar/components/avatar-list/AvatarList";
import { Calendar, ListCheck, MessageCircle, UserCog2 } from "lucide-react";
import NewQuestButton from "./components/quest-comps/new-quest-button/NewQuestButton";
import PartySearch from "./components/party-comps/party-search/PartySearch";
import SortMenu from "../../components/sort/SortMenu";
import DateRangePicker from "../../components/date-pickers/DateRangePicker";
import OrderToggle from "../../components/order/OrderToggle";
import QuestDrawer from "./components/quest-comps/create-quest-modal/CreateQuestModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetPartyQuests } from "./api/quest";
import { formatDate } from "../../shared/utils/date.utils";
import { getPercentage } from "../../shared/utils/account.utils";
import PriorityBadge from "./components/quest-comps/priority-badge/PriorityBadge";
import QuestGrid from "./components/quest-comps/quest-grid/QuestGrid";
import CreateQuestModal from "./components/quest-comps/create-quest-modal/CreateQuestModal";

type Props = {};

function PartyPage({}: Props) {
  // const searchParams = useSearch({ from: "/_authenticated/parties/$partyId" });
  // const navigate = useNavigate({ from: Route.fullPath });
  const { partyId } = Route.useParams();

  console.log(partyId);

  const {
    data: party,
    isPending,
    isError,
  } = useGetPartyDetails(Number(partyId), { enabled: true });

  const {
    data: quests,
    isPending: isQuestsPending,
    isError: isQuestsError,
  } = useGetPartyQuests(Number(partyId));

  console.log(party);

  // const currentPage = Number(searchParams.pageNumber) || 1;

  // const handlePageChange = (page: number) => {
  //   navigate({
  //     search: (prevSearch) => {
  //       return {
  //         ...prevSearch,
  //         pageNumber: page || 1,
  //       };
  //     },
  //   });
  // };

  const [opened, { open, close }] = useDisclosure(false);

  if (isPending && !party) return <div>Loading...</div>;
  if (isError) return <div>Something broken...</div>;

  return (
    <>
      <CreateQuestModal
        partyMembers={party.partyMembers}
        isOpened={opened}
        onClose={close}
      />
      <PageHeader>
        <Flex w="100%" justify="space-between">
          <Stack gap={4}>
            <Title size="2.5rem">{party.name}</Title>
            <Text>{party.description}</Text>
          </Stack>
          <NewQuestButton onOpen={open} />
        </Flex>
        <Flex py={16}>
          <Group align="end" gap={8}>
            <Stack gap={4}>
              <Text>Party Members</Text>
              <AvatarList partyMembers={party.partyMembers} />
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
            {/* <PartySearch />
            <SortMenu />
            <DateRangePicker />
            <OrderToggle /> */}
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
        {!isPending && quests && quests.length > 0 && (
          <QuestGrid quests={quests} />
        )}
        {!isPending && quests && quests.length === 0 && (
          <Text>No quests available for this party.</Text>
        )}
      </Box>
    </>
  );
}

export default PartyPage;
