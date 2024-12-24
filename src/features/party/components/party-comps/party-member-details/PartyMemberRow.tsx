import { Badge, Group, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { UserAvatar } from "../../../../avatar/shared/avatar.types";
import { formatDate } from "../../../../../shared/utils/date.utils";
import { Calendar } from "lucide-react";

type PartyMemberRowProps = {
  avatar: UserAvatar;
  username: string;
  role: number;
  level: number;
  joinDate: Date;
};

function PartyMemberRow({
  avatar,
  username,
  role,
  level,
  joinDate,
}: PartyMemberRowProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getRoleColor = (role: number) => {
    switch (role) {
      case 3:
        return "yellow"; // Leader
      case 2:
        return "blue"; // Captain
      case 1:
        return "gray"; // Member
      default:
        return "gray"; // Default
    }
  };

  const getRoleLabel = (role: number) => {
    switch (role) {
      case 3:
        return "Leader";
      case 2:
        return "Captain";
      case 1:
        return "Member";
      default:
        return "Member";
    }
  };

  const getLevelColor = (level: number) => {
    if (level <= 30) return "lime";
    if (level <= 50) return "blue";
    if (level <= 70) return "orange";
    return "red";
  };

  return (
    <Table.Tr>
      <Table.Td>
        <AvatarDisplay avatar={avatar} />
      </Table.Td>
      <Table.Td>
        <Text fw={700}>{username}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={getRoleColor(role)}>
          {getRoleLabel(role)}
        </Badge>
      </Table.Td>
      {!isMobile && (
        <Table.Td>
          <Badge
            variant="light"
            color={getLevelColor(level)}
          >{`Level ${level}`}</Badge>
        </Table.Td>
      )}
      {!isMobile && (
        <Table.Td>
          <Group align="center" gap={8}>
            <Calendar size={18} />
            {formatDate(joinDate)}
          </Group>
        </Table.Td>
      )}
    </Table.Tr>
  );
}

export default PartyMemberRow;
