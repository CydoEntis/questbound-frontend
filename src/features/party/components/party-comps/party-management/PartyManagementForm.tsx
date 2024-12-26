import { Table, Group, Select, Checkbox, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import { useUpdatePartyMembers } from "../../../api/party";

const ROLE_LABELS = {
  [MEMBER_ROLES.CAPTAIN]: "Captain",
  [MEMBER_ROLES.MEMBER]: "Member",
};

type PartyManagementFormProps = {
  partyId: number; // Expecting partyId as a prop
  partyMembers: PartyMember[];
  onCancel: () => void;
};

function PartyManagementForm({
  partyId,
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

  const updatePartyMembers = useUpdatePartyMembers();

  const handleSubmit = (values: typeof form.values) => {
    const membersToUpdate = values.members.map((m) => ({
      id: m.id,
      role: m.delete ? 0 : Number(m.role),
      delete: m.delete,
    }));

    updatePartyMembers.mutateAsync({
      partyId,
      members: membersToUpdate,
    });

    form.reset();
    onCancel();
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
          classNames={{
            input: "input",
          }}
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
          color="violet"
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
