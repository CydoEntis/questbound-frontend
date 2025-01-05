import { Title, Text } from "@mantine/core";
import { User } from "../../shared/account.types";
type AccountDetailsProps = {
  user: User;
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
