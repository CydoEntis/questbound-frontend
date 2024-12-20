import { Group, MultiSelect, MultiSelectProps, Text } from "@mantine/core";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { UserAvatar } from "../../../../avatar/shared/avatar.types";
import { UseFormReturnType } from "@mantine/form";
import { UpdateQuest } from "../../../shared/quest.types";

type UpdatePartyMemberSelectProps = {
  partyMembers: PartyMember[];
  assignedMembers: PartyMember[];
  form: UseFormReturnType<UpdateQuest>;
};

function UpdatePartyMemberSelect({
  partyMembers,
  form,
  assignedMembers,
}: UpdatePartyMemberSelectProps) {
  const memberData = partyMembers.map((member) => ({
    value: member.userId,
    label: member.username,
    avatar: member.avatar,
  }));

  const memberRecord = partyMembers.reduce(
    (acc, member) => {
      acc[member.userId] = {
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
  const selectedPartyMembers = assignedMembers.map((member) => member.userId);

  // console.log("SELECTED: ", selectedPartyMembers);

  return (
    <MultiSelect
      classNames={{
        input: "input",
      }}
      label="Assign Party Members"
      placeholder="Select Party Member"
      data={memberData}
      {...form.getInputProps("assignedMembers")}
      renderOption={renderMultiSelectOption}
    />
  );
}

export default UpdatePartyMemberSelect;
