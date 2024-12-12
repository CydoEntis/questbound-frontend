import {
  Card,
  Flex,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Avatar,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Party } from "../../../shared/party.types";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";

type PartyCardProps = { party: Party };

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function PartyCard({ party }: PartyCardProps) {
  const partyLeader = party.partyMembers.find(
    (member) => member.role === MEMBER_ROLES.CREATOR
  );


  return (
    <Card
      component={Link}
      to={`/parties/${party.id}`}
      key={party.id}
      className="transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      shadow="sm"
      padding="lg"
      bg="card"
      radius="md"
      withBorder
      mih={350}
    >
      <Stack mt="md" mb="xs" gap={8} style={{ flex: 1 }}>
        <Group gap={16}>
          <AvatarDisplay avatar={partyLeader!.avatar} size="lg" />
          <Stack gap={4}>
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
              {party.name}
            </Title>
            <Text size="xs">Created at: {formatDate(party.createdAt)}</Text>
          </Stack>
        </Group>
        <Group gap={4} py={8}>
          <Badge color="lime">New!</Badge>
          <Badge color="red">Active!</Badge>
        </Group>
        <Text>{party.description}</Text>
      </Stack>

      <Flex justify="space-between" align="center">
        <Stack gap={4} w="100%">
          <Flex justify="space-between" align="center" w="100%">
            <AvatarList partyMembers={party.partyMembers} />
            <Text size="xs" c="gray">
              Last accessed: {formatDate(party.updatedAt)}
            </Text>
          </Flex>
        </Stack>
      </Flex>

      <Stack>{/* Optional: You can add quest-related components here */}</Stack>
    </Card>
  );
}

export default PartyCard;
