import { Avatar, AvatarGroup } from "@mantine/core";
import { PartyMember } from "../../../party-member/shared/party-members.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";

type AvatarListProps = {
  partyMembers: PartyMember[];
  totalMembers: number;
};

const AvatarList = ({ partyMembers, totalMembers }: AvatarListProps) => {
  const displayedMembers = partyMembers.slice(0, 4);
  const extraMembers = totalMembers - displayedMembers.length;

  return (
    <AvatarGroup>
      {displayedMembers.map((member, index) => (
        <AvatarDisplay key={index} avatar={member.avatar} />
      ))}

      {extraMembers > 0 && <Avatar>+{extraMembers}</Avatar>}
    </AvatarGroup>
  );
};

export default AvatarList;
