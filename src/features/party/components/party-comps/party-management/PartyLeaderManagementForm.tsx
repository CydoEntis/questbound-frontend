import { Table, Group, Select, Button, Box, Text, Avatar } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PartyMember } from "../../../../party-member/shared/party-members.types";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";

const ROLE_LABELS = {
  [MEMBER_ROLES.LEADER]: "Leader",
  [MEMBER_ROLES.CAPTAIN]: "Captain",
  [MEMBER_ROLES.MEMBER]: "Member",
};

type PartyLeaderManagementFormProps = {
  partyLeader: PartyMember;
  partyMembers: PartyMember[];
};

function PartyLeaderManagementForm({
  partyLeader,
  partyMembers,
}: PartyLeaderManagementFormProps) {
  const form = useForm({
    initialValues: {
      currentLeaderId: partyLeader.userId,
      newLeaderId: "",
      newRole: String(partyLeader.role),
    },
    validate: {
      newLeaderId: (value) => (value ? null : "New leader is required"),
      newRole: (value) => (value ? null : "Role is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Updated leader details:", values);
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
                  value,
                  label,
                }))}
                value={form.values.newRole}
                onChange={(value) => form.setFieldValue("newRole", value!)}
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
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Submit Button */}
      <Group justify="start" my="md" >
        <Button type="submit" variant="light" color="violet">
          Update Leader
        </Button>
      </Group>
    </form>
  );
}

export default PartyLeaderManagementForm;
