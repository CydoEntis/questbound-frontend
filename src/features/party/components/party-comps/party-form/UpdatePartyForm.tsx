import { zodResolver } from "@mantine/form";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { partySchema } from "../../../shared/party.schemas";
import { PartyData } from "../../../shared/party.types";
import { useGetPartyDetails, useUpdateParty } from "../../../api/party";
import { useEffect } from "react";

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
    } catch (error) {
      console.error("Error updating party", error);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching party details</div>;

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
        Update Party
      </Button>
    </form>
  );
}

export default UpdatePartyForm;
