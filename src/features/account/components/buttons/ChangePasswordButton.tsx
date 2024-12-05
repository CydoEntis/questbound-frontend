import { Button, Flex } from "@mantine/core";
import ChangePasswordForm from "../forms/ChangePasswordForm";

type ChangePasswordProps = {
  isOpened: boolean;
  closeFormHandler: () => void;
  showFormHandler: () => void;
};

function ChangePassword({
  isOpened,
  closeFormHandler,
  showFormHandler,
}: ChangePasswordProps) {
  if (isOpened) return <ChangePasswordForm handleClose={closeFormHandler} />;

  return (
    <Flex justify="end" pt={8}>
      <Button variant="outline" color="violet" onClick={showFormHandler}>
        Change Password
      </Button>
    </Flex>
  );
}

export default ChangePassword;
