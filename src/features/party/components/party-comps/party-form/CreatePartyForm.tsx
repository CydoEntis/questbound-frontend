import { zodResolver } from "@mantine/form";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateParty } from "../../../api/party";
import { partySchema } from "../../../shared/party.schemas";
import { PartyData } from "../../../shared/party.types";
import { AxiosError } from "axios";
import { Errors, CamelCasedErrors } from "../../../../../shared/types";
import { transformErrorsToCamelCase } from "../../../../../shared/utils/password.utils";

type CreatePartyProps = {
  onClose: () => void;
};

function CreatePartyForm({ onClose }: CreatePartyProps) {
  const createParty = useCreateParty();

  const form = useForm<PartyData>({
    validate: zodResolver(partySchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (data: PartyData) => {
    try {
      const newlyCreatedParty = await createParty.mutateAsync(data);
      console.log(newlyCreatedParty);
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
        <TextInput
          label="Party Name"
          placeholder="Name of your Party?"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Describe your party"
          autosize
          {...form.getInputProps("description")}
        />
      </Stack>
      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        Create Party
      </Button>
    </form>
  );
}

export default CreatePartyForm;
