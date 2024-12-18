import { Group, MultiSelect, MultiSelectProps, Text } from "@mantine/core";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { UserAvatar } from "../../../../avatar/shared/avatar.types";

type PartyMemberSelectProps = {
  partyMembers: PartyMember[];
  multiSelectProps: MultiSelectProps;
};

function PartyMemberSelect({
  partyMembers,
  multiSelectProps,
}: PartyMemberSelectProps) {
  const memberData = partyMembers.map((member) => ({
    value: member.username,
    label: member.username,
    avatar: member.avatar,
  }));

  const memberRecord = partyMembers.reduce(
    (acc, member) => {
      acc[member.username] = {
        username: member.username,
        avatar: member.avatar,
      };
      return acc;
    },
    {} as Record<string, { username: string; avatar: UserAvatar }>
  );

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <AvatarDisplay avatar={memberRecord[option.value].avatar} />
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  );

  return (
    <MultiSelect
      label="Assign Party Members"
      placeholder="Select Party Member"
      data={memberData}
      {...multiSelectProps}
      renderOption={renderMultiSelectOption}
    />
  );
}

export default PartyMemberSelect;
