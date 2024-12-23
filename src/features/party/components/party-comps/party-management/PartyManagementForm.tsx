import { zodResolver } from "@mantine/form";
import { Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { partySchema } from "../../../shared/party.schemas";
import { PartyData } from "../../../shared/party.types";
import { AxiosError } from "axios";
import { Errors, CamelCasedErrors } from "../../../../../shared/types";
import { transformErrorsToCamelCase } from "../../../../../shared/utils/password.utils";
import AvatarDisplay from "../../../../avatar/components/avatar-display/AvatarDisplay";
import { PartyMember } from "../../../../party-member/shared/party-members.types";

type PartyManagementFormProps = {
  onClose: () => void;
  partyMembers: PartyMember[]
};

function PartyManagementFormForm({ onClose }: PartyManagementFormProps) {
  const form = useForm<PartyData>({
    validate: zodResolver(partySchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async () => {
    try {
      onClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errors: Errors = error.response.data;
        const transformedErrors: CamelCasedErrors =
          transformErrorsToCamelCase(errors);
        form.setErrors(transformedErrors);
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={8}>
        {/* <AvatarDisplay /> */}
        {/* <TextInput
          label="Party Name"
          placeholder="Name of your Party?"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Describe your party"
          autosize
          {...form.getInputProps("description")}
        /> */}
      </Stack>
      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        Create Party
      </Button>
    </form>
  );
}

export default PartyManagementFormForm;
