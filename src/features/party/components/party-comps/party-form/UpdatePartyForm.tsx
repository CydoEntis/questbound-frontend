import { zodResolver } from "@mantine/form";
import {
  Button,
  Group,
  Skeleton,
  Stack,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { partySchema } from "../../../shared/party.schemas";
import { PartyData } from "../../../shared/party.types";
import { useGetPartyDetails, useUpdateParty } from "../../../api/party";
import { useEffect } from "react";
import { ErrorResponse } from "../../../../../api/errors/error.types";
import useFormErrorHandler from "../../../../../shared/hooks/useHandleErrors";

type UpdatePartyProps = {
  partyId: number;
  onClose: () => void;
};

function UpdatePartyForm({ partyId, onClose }: UpdatePartyProps) {
  const {
    data: party,
    isError,
    isPending,
  } = useGetPartyDetails(partyId, {
    enabled: !!partyId,
  });

  const updateParty = useUpdateParty();
  const { handleFormErrors } = useFormErrorHandler<PartyData>();

  const form = useForm<PartyData>({
    validate: zodResolver(partySchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (party) {
      form.setValues({
        name: party.name,
        description: party.description,
      });
    }
  }, [party]);

  const handleSubmit = async (data: PartyData) => {
    try {
      await updateParty.mutateAsync({
        partyId,
        updatedParty: data,
      });
      onClose();
    } catch (e) {
      const error = e as ErrorResponse;
      handleFormErrors(error, form);
    }
  };

  if (isPending)
    return (
      <Stack gap={8}>
        <Skeleton height={40} radius="md" w="100%" />
        <Skeleton height={40} radius="md" w="100%" />
        <Group mt={16}>
          <Skeleton height={40} radius="md" w="100%" />
        </Group>
      </Stack>
    );
  if (isError)
    return (
      <Stack gap={8} align="center">
        <Text ta="center" c="red">
          Party details could not be loaded
        </Text>
        <Button onClick={onClose} variant="light" color="red" w={120}>
          Close
        </Button>
      </Stack>
    );

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
        Update Party
      </Button>
    </form>
  );
}

export default UpdatePartyForm;
