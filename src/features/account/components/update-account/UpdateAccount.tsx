import { Stack } from "@mantine/core";
import AccountDetails from "../account-details/AccountDetails";
import UpdateAccountForm from "../update-account-form/UpdateAccountForm";
import ManageAccountControls from "../update-account-toggle/UpdateAccountToggle";
import { AuthenticatedUser, User } from "../../shared/account.types";
import UpdateAccountToggle from "../update-account-toggle/UpdateAccountToggle";

type UpdateAccountProps = {
  user: User;
  isOpen: boolean;
  closeFormHandler: () => void;
  showFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function UpdateAccount({
  user,
  isOpen,
  closeFormHandler,
  showFormHandler,
}: UpdateAccountProps) {
  return (
    <>
      <UpdateAccountToggle
        isOpen={isOpen}
        showFormHandler={showFormHandler}
        closeFormHandler={closeFormHandler}
      />
      <Stack gap={4}>
        {isOpen ? (
          <UpdateAccountForm user={user} handleClose={closeFormHandler} />
        ) : (
          <AccountDetails user={user} />
        )}
      </Stack>
    </>
  );
}

export default UpdateAccount;
