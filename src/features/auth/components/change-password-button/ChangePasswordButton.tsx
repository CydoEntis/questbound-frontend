import { Button, Flex } from "@mantine/core";

type ChangePasswordButtonProps = {
  showFormHandler: () => void;
};

function ChangePasswordButton({ showFormHandler }: ChangePasswordButtonProps) {
  return (
    <Flex justify="end" pt={8}>
      <Button variant="outline" color="violet" onClick={showFormHandler}>
        Change Password
      </Button>
    </Flex>
  );
}

export default ChangePasswordButton;
