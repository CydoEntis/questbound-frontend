import { useForm, zodResolver } from "@mantine/form";
import { Button, TextInput, Group, Flex } from "@mantine/core";
import { useInviteMember } from "../../../api/party";
import { inviteSchema } from "../../../shared/party.schemas";
import { InviteMember } from "../../../shared/party.types";

type InviteMemberFormProps = {
  partyId: number;
};

function InviteMemberForm({ partyId }: InviteMemberFormProps) {
  const inviteMember = useInviteMember();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(inviteSchema),
  });

  const handleSubmit = (values: InviteMember) => {
    inviteMember.mutate(
      { partyId, email: values.email },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex align="end" gap={8}>
        <TextInput
          label="Invite Member by Email"
          placeholder="Enter member's email"
          {...form.getInputProps("email")}
          classNames={{ input: "input" }}
          w="100%"
        />
        <Group>
          <Button
            type="submit"
            disabled={inviteMember.isPending}
            variant="light"
            color="violet"
          >
            {inviteMember.isPending ? "Sending..." : "Send Invite"}
          </Button>
        </Group>
      </Flex>
    </form>
  );
}

export default InviteMemberForm;
