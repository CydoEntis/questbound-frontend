import { Avatar, AvatarGroup } from "@mantine/core";
import { PartyMember } from "../../../party-member/shared/party-members.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";

type AvatarListProps = {
  partyMembers: PartyMember[];
};

const AvatarList = ({ partyMembers }: AvatarListProps) => {
  const visibleMembers = partyMembers.slice(0, 4);

  const remainingMembers = partyMembers.slice(4);

  return (
    <AvatarGroup>
      {visibleMembers.map((member, index) => (
        <AvatarDisplay key={index} avatar={member.avatar} />
      ))}

      {remainingMembers.length > 0 && (
        <Avatar>+{remainingMembers.length}</Avatar>
      )}
    </AvatarGroup>
  );
};

export default AvatarList;
