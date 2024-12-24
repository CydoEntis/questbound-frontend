import React from "react";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import PartyMemberRow from "./PartyMemberRow";

type PartyMemberDetailProps = {
  partyMembers: PartyMember[];
};

function PartyMemberDetail({ partyMembers }: PartyMemberDetailProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Table w="100%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Avatar</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Role</Table.Th>
          {!isMobile && <Table.Th>Level</Table.Th>}
          {!isMobile && <Table.Th>Join Date</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {partyMembers.map((member) => (
          <PartyMemberRow
            level={member.currentLevel}
            joinDate={member.joinedAt}
            key={member.userId}
            {...member}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default PartyMemberDetail;
