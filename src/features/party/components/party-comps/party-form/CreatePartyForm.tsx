import { zodResolver } from "@mantine/form";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateParty } from "../../../api/party";
import { partySchema } from "../../../shared/party.schemas";
import { PartyData } from "../../../shared/party.types";

import useFormErrorHandler from "../../../../../shared/hooks/useHandleErrors";
import { ErrorResponse } from "../../../../../api/errors/error.types";

type CreatePartyProps = {
  onClose: () => void;
};

function CreatePartyForm({ onClose }: CreatePartyProps) {
  const createParty = useCreateParty();
  const { handleFormErrors } = useFormErrorHandler<PartyData>();

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
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={8}>
        <TextInput
          classNames={{ input: "input" }}
          label="Party Name"
          placeholder="Name of your Party?"
          {...form.getInputProps("name")}
        />
        <Textarea
          classNames={{ input: "input" }}
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
