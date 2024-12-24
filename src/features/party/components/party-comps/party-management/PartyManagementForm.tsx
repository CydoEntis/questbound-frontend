import {
  Table,
  Group,
  Select,
  Checkbox,
  Button,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";

const ROLE_LABELS = {
  [MEMBER_ROLES.LEADER]: "Leader",
  [MEMBER_ROLES.CAPTAIN]: "Captain",
  [MEMBER_ROLES.MEMBER]: "Member",
};

type PartyManagementFormProps = {
  partyMembers: PartyMember[];
  onCancel: () => void;
};

function PartyManagementForm({
  partyMembers,
  onCancel,
}: PartyManagementFormProps) {
  const form = useForm({
    initialValues: {
      members: partyMembers.map((member) => ({
        id: member.userId,
        role: String(member.role),
        delete: false,
      })),
    },
    validate: {
      members: {
        role: (value) => (value ? null : "Role is required"),
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
  };

  const rows = form.values.members.map((member, index) => (
    <Table.Tr key={member.id}>
      {/* Member Display */}
      <Table.Td>
        <Group>
          <AvatarDisplay avatar={partyMembers[index]?.avatar} />
          <Text>{partyMembers[index]?.username}</Text>
        </Group>
      </Table.Td>

      {/* Role Selector */}
      <Table.Td>
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
      </Table.Td>

      {/* Remove Checkbox */}
      <Table.Td>
        <Checkbox
          checked={member.delete}
          onChange={(event) =>
            form.setFieldValue(
              `members.${index}.delete`,
              event.currentTarget.checked
            )
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Member</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Remove</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* Submit Button */}
      <Group mt="md" gap={8}>
        <Button type="submit" variant="light" color="violet">
          Save Changes
        </Button>
        <Button type="button" variant="light" color="red" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}

export default PartyManagementForm;
