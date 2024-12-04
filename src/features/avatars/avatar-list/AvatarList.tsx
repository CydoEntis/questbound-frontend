import { Avatar, Tooltip } from "@mantine/core";
import React from "react";
import ActiveAvatar from "../avatar/Avatar";
import { Member } from "../../members/shared/types";

type AvatarListProps = { members: Member[] };

function AvatarList({ members }: AvatarListProps) {
  const showableMembers = members.slice(0, 5);
  const remainingMembers = members.length - 5;

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {showableMembers.map((member, index) => (
          <Tooltip key={index} label={member.displayName} withArrow>
            <ActiveAvatar avatar={member.avatar} />
          </Tooltip>
        ))}
        {remainingMembers > 0 ? (
          <Avatar radius="xl">+{remainingMembers}</Avatar>
        ) : null}
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export default AvatarList;
