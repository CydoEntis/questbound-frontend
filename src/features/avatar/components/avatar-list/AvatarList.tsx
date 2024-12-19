import { Avatar, AvatarGroup } from "@mantine/core";
import { PartyMember } from "../../../party-member/shared/party-members.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";

type AvatarListProps = {
  partyMembers: PartyMember[];
  totalMembers: number;
};

const AvatarList = ({ partyMembers, totalMembers }: AvatarListProps) => {
  return (
    <AvatarGroup>
      {partyMembers.map((member, index) => (
        <AvatarDisplay key={index} avatar={member.avatar} />
      ))}

      <Avatar>+{totalMembers - 4}</Avatar>
    </AvatarGroup>
  );
};

export default AvatarList;
