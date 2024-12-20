import {
  Card,
  Flex,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  ActionIcon,
  Divider,
  Progress,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Party } from "../../../shared/party.types";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import AvatarList from "../../../../avatar/components/avatar-list/AvatarList";
import { isSameDay } from "../../../../../shared/utils/date.utils";
import { CalendarPlus, MoreVertical } from "lucide-react";
import { getPercentage } from "../../../../../shared/utils/account.utils";

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
      {/* Badges and Action Icon */}
      <Flex justify="space-between" align="center" py={4}>
        <Group gap="xs">
          {isSameDay(new Date(party.createdAt), new Date()) && (
            <Badge color="cyan" variant="light">
              New!
            </Badge>
          )}
          {isSameDay(new Date(party.updatedAt), new Date()) && (
            <Badge color="orange" variant="light">
              Active!
            </Badge>
          )}
          {party.totalQuests > 50 && (
            <Badge color="yellow" variant="light">
              Quester!
            </Badge>
          )}
          {party.completedQuests > 50 && (
            <Badge color="lime" variant="light">
              Completionist!
            </Badge>
          )}
        </Group>
        <ActionIcon variant="subtle" color="dimmed">
          <MoreVertical size={20} />
        </ActionIcon>
      </Flex>
      <Stack justify="space-between" gap="md" h="100%">
        {/* Party Title and Description */}
        <Stack gap="xs">
          <Title size="1.5rem" fw={600} className="truncate ...">
            {party.name}
          </Title>
          <Text c="dimmed" size="sm">
            {party.description}
          </Text>
        </Stack>
        <Stack gap={8}>
          <Text size="sm" c="dimmed">
            Progress
          </Text>
          <Progress
            w="100%"
            color="violet"
            radius="xl"
            size="md"
            value={Math.max(
              2,
              getPercentage(party.completedQuests, party.totalQuests)
            )}
            striped
            animated
          />
        </Stack>

        {/* Stats Section */}
        <Flex align="center" justify="space-around" gap="lg">
          <Stack gap="xs" align="center">
            <Text size="lg" fw={500}>
              {party.completedQuests}
            </Text>
            <Text size="sm" c="dimmed">
              Completed
            </Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap="xs" align="center">
            <Text size="lg" fw={500}>
              {party.pastDueQuests}
            </Text>
            <Text size="sm" c="dimmed">
              Past Due
            </Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap="xs" align="center">
            <Text size="lg" fw={500}>
              {party.totalQuests}
            </Text>
            <Text size="sm" c="dimmed">
              Total
            </Text>
          </Stack>
        </Flex>

        {/* Footer Section */}
        <Flex justify="space-between" align="end">
          <AvatarList
            partyMembers={party.partyMembers}
            totalMembers={party.totalPartyMembers}
          />
          <Group align="center" gap={8}>
            <Text size="xs" c="dimmed">
              {formatDate(party.createdAt)}
            </Text>
            <CalendarPlus size={18} color="gray" />
          </Group>
        </Flex>
      </Stack>
    </Card>
  );
}

export default PartyCard;
