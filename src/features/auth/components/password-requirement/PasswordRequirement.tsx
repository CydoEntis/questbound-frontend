import { Text } from "@mantine/core";
import { Check, X } from "lucide-react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <Check style={{ width: "14px", height: "14px" }} />
      ) : (
        <X style={{ width: "14px", height: "14px" }} />
      )}
      <span>{label}</span>
    </Text>
  );
}

export default PasswordRequirement;
