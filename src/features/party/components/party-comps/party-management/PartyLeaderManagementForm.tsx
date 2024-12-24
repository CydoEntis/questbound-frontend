import { Group, Select, Stack, Button, Box } from "@mantine/core";
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

type PartyLeaderManagementFormProps = {
  partyLeader: PartyMember;
};

function PartyLeaderManagementForm({
  partyLeader,
}: PartyLeaderManagementFormProps) {
  const form = useForm({
    initialValues: {
      id: partyLeader.userId,
      role: String(partyLeader.role),
    },

    validate: {
      role: (value) =>
        !value || !(value in MEMBER_ROLES) ? "A valid role is required" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Updated leader:", values);
    // Call API to update the leader's role here
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group>
          {/* Leader's Avatar */}
          <AvatarDisplay avatar={partyLeader.avatar} />

          {/* Role Selector */}
          <Select
            label="Role"
            data={Object.entries(ROLE_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
            value={form.values.role}
            onChange={(value) => form.setFieldValue("role", value!)}
          />
        </Group>

        {/* Submit Button */}
        <Box>
          <Button type="submit">Submit Changes</Button>
        </Box>
      </Stack>
    </form>
  );
}

export default PartyLeaderManagementForm;
