import { Table, Group, Select, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { useUpdatePartyLeader } from "../../../api/party";
import { MemberRole } from "../../../../../shared/types";

const ROLE_LABELS = {
  [MEMBER_ROLES.LEADER]: "Leader",
  [MEMBER_ROLES.CAPTAIN]: "Captain",
  [MEMBER_ROLES.MEMBER]: "Member",
};

type PartyLeaderManagementFormProps = {
  partyLeader: PartyMember;
  partyMembers: PartyMember[];
  onCancel: () => void;
};

function PartyLeaderManagementForm({
  partyLeader,
  partyMembers,
  onCancel,
}: PartyLeaderManagementFormProps) {
  const form = useForm({
    initialValues: {
      currentLeaderId: partyLeader.userId,
      newLeaderId: "",
      newRole: partyLeader.role, // Role is kept as a number
    },
    validate: {
      newLeaderId: (value) => (value ? null : "New leader is required"),
      newRole: (value) =>
        typeof value === "number" && value > 0 ? null : "Role is required",
    },
  });

  const updatePartyLeader = useUpdatePartyLeader();

  const handleSubmit = async (values: typeof form.values) => {
    await updatePartyLeader.mutateAsync(
      {
        partyId: partyLeader.partyId,
        data: {
          currentLeaderId: values.currentLeaderId,
          newLeaderId: values.newLeaderId,
          newRoleForPreviousLeader: values.newRole,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          onCancel();
        },
        onError: () => {},
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Current Leader</Table.Th>
            <Table.Th>New Role</Table.Th>
            <Table.Th>New Leader</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Group>
                <AvatarDisplay avatar={partyLeader.avatar} />
                <Text>{partyLeader.username}</Text>
              </Group>
            </Table.Td>

            <Table.Td>
              <Select
                classNames={{
                  input: "input",
                }}
                data={Object.entries(ROLE_LABELS).map(([value, label]) => ({
                  value: value.toString(),
                  label,
                }))}
                value={form.values.newRole.toString()}
                onChange={(value) =>
                  form.setFieldValue(
                    "newRole",
                    parseInt(value!, 10) as MemberRole
                  )
                }
                error={form.errors.newRole}
              />
            </Table.Td>

            <Table.Td>
              <Select
                classNames={{
                  input: "input",
                }}
                data={partyMembers
                  .filter((member) => member.userId !== partyLeader.userId)
                  .map((member) => ({
                    value: member.userId,
                    label: member.username,
                  }))}
                value={form.values.newLeaderId}
                onChange={(value) => form.setFieldValue("newLeaderId", value!)}
                error={form.errors.newLeaderId}
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      <Group justify="start" my="md" gap={8}>
        <Button type="submit" variant="light" color="violet">
          Update Leader
        </Button>
        <Button type="button" variant="light" color="red" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}

export default PartyLeaderManagementForm;
