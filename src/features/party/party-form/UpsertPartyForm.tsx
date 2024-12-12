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
import { useMatch, useNavigate, useSearch } from "@tanstack/react-router"; // Use useSearch for query params
import { PartyData } from "../shared/party.types";
import { partySchema } from "../shared/party.schemas";
import { useCreateParty, useGetPartyDetails } from "../api/party";
import { AxiosError } from "axios";
import { Errors, CamelCasedErrors } from "../../../shared/types";
import { transformErrorsToCamelCase } from "../../../shared/utils/password.utils";

type UpsertPartyProps = {
  onClose: () => void;
};

function UpsertPartyForm({ onClose }: UpsertPartyProps) {
  const searchParams = useSearch({
    from: "/_authenticated/parties/",
  });

  const match = useMatch({ from: "/_authenticated/parties/" });

  if (!match) {
    return <div>No active match found for /_authenticated/parties/</div>;
  }

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

  const handleSubmit = async (data: PartyData) => {
    try {
      const newlyCreatedParty = await createParty.mutateAsync(data);
      console.log(newlyCreatedParty);
      onClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        console.log(error.response.data);
        const errors: Errors = error.response.data;
        console.log("ERRORS: ", errors);
        const transformedErrors: CamelCasedErrors =
          transformErrorsToCamelCase(errors);
        form.setErrors(transformedErrors);
      }
    }
    // if (partyId) {
    //   updatePartyMutation.mutate({ ...data, id: partyId }); // Pass the partyId if updating
    // } else {
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
