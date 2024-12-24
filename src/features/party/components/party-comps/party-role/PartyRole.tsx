import { Badge, Group, Text } from "@mantine/core";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { UserAvatar } from "../../../../avatar/shared/avatar.types";
import { formatDate } from "../../../../../shared/utils/date.utils";

type PartyRoleProps = {
  avatar: UserAvatar;
  username: string;
  role: number;
  level: number;
  joinDate: Date;
};

function PartyRole({
  avatar,
  username,
  role,
  level,
  joinDate,
}: PartyRoleProps) {
  const getRoleColor = (role: number) => {
    switch (role) {
      case 3: // Leader
        return "yellow";
      case 2: // Captain
        return "blue";
      case 1: // Member
        return "gray";
      default:
        return "gray";
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

  return (
    <Group>
      <AvatarDisplay avatar={avatar} />
      <Text>{username}</Text>
      <Text>{level}</Text>
      <Badge color={getRoleColor(role)}>{getRoleLabel(role)}</Badge>
      <Text>{formatDate(joinDate)}</Text>
    </Group>
  );
}

export default PartyRole;
