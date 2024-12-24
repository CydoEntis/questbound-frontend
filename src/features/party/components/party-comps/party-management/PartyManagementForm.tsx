import { Group, Select, Stack, Checkbox, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

const MEMBER_ROLES = {
  CREATOR: 3,
  MAINTAINER: 2,
  MEMBER: 1,
} as const;

const ROLE_LABELS = {
  [MEMBER_ROLES.CREATOR]: "Creator",
  [MEMBER_ROLES.MAINTAINER]: "Maintainer",
  [MEMBER_ROLES.MEMBER]: "Member",
};

type PartyManagementFormProps = {
  partyMembers: PartyMember[];
};

function PartyManagementForm({ partyMembers }: PartyManagementFormProps) {
  const form = useForm({
    initialValues: {
      members:
        partyMembers?.map((member) => ({
          id: member.userId,
          role: String(member.role),
          delete: false,
        })) || [],
    },

    validate: {
      members: {
        role: (value) => (value.length === 0 ? "Role is required" : null),
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const membersToDelete = values.members
      .filter((m) => m.delete)
      .map((m) => m.id);
    const updatedRoles = values.members
      .filter((m) => !m.delete)
      .map((m) => ({ id: m.id, role: Number(m.role) }));

    console.log("Members to delete:", membersToDelete);
    console.log("Updated roles:", updatedRoles);
  };

  if (!partyMembers) return null;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {form.values.members.map((member, index) => (
          <Group key={member.id}>
            <Checkbox
              checked={member.delete}
              onChange={(event) =>
                form.setFieldValue(
                  `members.${index}.delete`,
                  event.currentTarget.checked
                )
              }
            />
            <AvatarDisplay avatar={partyMembers[index]?.avatar} />
            <Select
              data={Object.entries(ROLE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
              value={member.role}
              onChange={(value) =>
                form.setFieldValue(`members.${index}.role`, value)
              }
            />
          </Group>
        ))}

        {/* Submit Button */}
        <Box>
          <Button type="submit">Submit Changes</Button>
        </Box>
      </Stack>
    </form>
  );
}

export default PartyManagementForm;
