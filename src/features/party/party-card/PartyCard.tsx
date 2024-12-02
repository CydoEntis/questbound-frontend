import {
  Card,
  Flex,
  Group,
  Paper,
  Stack,
  Tooltip,
  Badge,
  Title,
  Text,
} from "@mantine/core";
import { CalendarFoldIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Party } from "../shared/types";

type PartyCardProps = { party: Party };

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function PartyCard({ party }: PartyCardProps) {
  return (
    <Card
      component={Link}
      to={`/parties/${party.id}/quests`}
      key={party.id}
      className="transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      bg={"card"}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      mih={350}
    >
      <Stack mt="md" mb="xs" gap={8} style={{ flex: 1 }}>
        {/* <p>Created: {formatDate(party.createdAt)}</p>
        <p>Updated: {formatDate(party.updatedAt)}</p> */}
        <Group w="100%">
          <Title
            size="1.5rem"
            fw={600}
            className="truncate ..."
            style={{
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {party.partyName}
          </Title>

        </Group>
        <Text>Created At: {formatDate(party.createdAt)}</Text>
        <Text>Updated At: {formatDate(party.updatedAt)}</Text>
      </Stack>

      <Flex justify="space-between" align="center">
        {/* {creator && (
          <Stack gap={8}>
            <Group gap={4}>
              <Crown color="yellow" size={14} />
              <Text size="xs">Creator</Text>
            </Group>
            <Tooltip label={creator.displayName}>
              <UserAvatar avatar={creator.avatar} />
            </Tooltip>
          </Stack>
        )} */}

        {/* <Stack gap={4}>
          <Group gap={4}>
            <Users size={14} />
            <Text size="xs">Members</Text>
          </Group>
          <Members members={party.members} numOfMembersToShow={3} />
        </Stack> */}
      </Flex>

      <Stack>
        {/* <Paper withBorder p={8} mt={16} bg="secondary" shadow="none">
          <Stack gap={8} align="center">
            <Text size="sm">Quest Progress</Text>
            <Group>
              <Tooltip label={"Completed"}>
                <Badge
                  size="lg"
                  color="lime"
                  variant="light"
                  leftSection={
                    <CircleCheck style={{ width: rem(16), height: rem(16) }} />
                  }
                >
                  {party.questStats.completedQuests}
                </Badge>
              </Tooltip>
              <Tooltip label={"In Progress"}>
                <Badge
                  size="lg"
                  color="yellow"
                  variant="light"
                  leftSection={
                    <Loader style={{ width: rem(16), height: rem(16) }} />
                  }
                >
                  {party.questStats.inProgressQuests}
                </Badge>
              </Tooltip>
              <Tooltip label={"Past Due"}>
                <Badge
                  size="lg"
                  color="red"
                  variant="light"
                  leftSection={
                    <CalendarX style={{ width: rem(16), height: rem(16) }} />
                  }
                >
                  {party.questStats.pastDueQuests}
                </Badge>
              </Tooltip>
            </Group>
          </Stack>
        </Paper> */}
        {/* <Flex justify="space-between" pt={16} align={"center"}>
          <Text size="xs" c="gray">
            Last Accessed
          </Text>
          <Group gap={8} align="center">
            <CalendarFoldIcon size={14} />
            <Text size="xs" c="gray">
              {formatDate(party.updatedAt)}
            </Text>
          </Group>
        </Flex> */}
      </Stack>
    </Card>
  );
}

export default PartyCard;
