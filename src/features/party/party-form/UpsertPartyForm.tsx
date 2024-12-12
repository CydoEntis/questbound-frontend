import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  ColorSwatch,
  Flex,
  Stack,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router"; // Use useSearch for query params
import { PartyData } from "../shared/party.types";
import { partySchema } from "../shared/party.schemas";
import { useCreateParty, useGetPartyDetails } from "../api/party";

type UpsertPartyProps = {
  onClose: () => void;
};

function UpsertPartyForm({ onClose }: UpsertPartyProps) {
  const searchParams = useSearch({
    from: "/_authenticated/parties/",
  });
  const partyId = searchParams.partyId;

  const [selectedColor, setSelectedColor] = useState("red");
  const colors = [
    { name: "red", value: "#E03131" },
    { name: "violet", value: "#6741D9" },
    { name: "blue", value: "#1971C2" },
    { name: "green", value: "#2F9E44" },
  ];

  const {
    data: party,
    isError,
    isPending,
  } = partyId
    ? useGetPartyDetails(Number(partyId), { enabled: true })
    : { data: null, isError: false, isPending: false };

  const createParty = useCreateParty();

  const form = useForm<PartyData>({
    validate: zodResolver(partySchema),
    initialValues: {
      name: party?.name || "",
      description: party?.description || "",
    },
  });

  //   // Mutation for updating an existing party
  //   const updatePartyMutation = useMutation(updateParty, {
  //     onSuccess: (updatedParty) => {
  //       navigate(`/parties/${updatedParty.id}`);
  //       onClose();
  //     },
  //   });

  const navigate = useNavigate();

  const handleSubmit = (data: PartyData) => {
    // if (partyId) {
    //   updatePartyMutation.mutate({ ...data, id: partyId }); // Pass the partyId if updating
    // } else {
    createParty.mutate(data); // Create a new party
    // }
  };

  useEffect(() => {
    if (party) {
      form.setValues({
        name: party.name,
        description: party.description,
      });
      //   setSelectedColor(party.color || "red");
    }
  }, [party, partyId]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching party</div>;

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

        {/* <Text size="sm">Select a Color</Text>
        <Flex py={8} gap={8} align="center">
          {colors.map((color) => (
            <ColorSwatch
              key={color.name}
              color={color.value}
              onClick={() => setSelectedColor(color.name)}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              {selectedColor === color.name ? <Check size={20} /> : null}
            </ColorSwatch>
          ))}
        </Flex> */}
      </Stack>
      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        {partyId ? "Update Party" : "Create Party"}
      </Button>
    </form>
  );
}

export default UpsertPartyForm;
