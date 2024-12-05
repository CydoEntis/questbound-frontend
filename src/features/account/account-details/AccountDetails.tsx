import { Title, Text } from "@mantine/core";
import { AuthenticatedUser } from "../../auth/shared/types";
type AccountDetailsProps = {
  user: AuthenticatedUser;
};

function AccountDetails({ user }: AccountDetailsProps) {
  return (
    <>
      <Title size="1.75rem">{user.username}</Title>
      <Text>{user.email}</Text>
    </>
  );
}

export default AccountDetails;
