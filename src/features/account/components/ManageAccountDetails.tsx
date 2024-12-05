import { Stack } from "@mantine/core";
import AccountDetails from "./AccountDetails";
import UpdateAccountDetailsForm from "./forms/UpdateAccountDetailsForm";
import ManageAccountControls from "./ManageAccountControls";
import { AuthenticatedUser } from "../shared/account.types";

type ManageAccountDetialsProps = {
  user: AuthenticatedUser;
  isOpen: boolean;
  closeFormHandler: () => void;
  showFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ManageAccountDetails({
  user,
  isOpen,
  closeFormHandler,
  showFormHandler,
}: ManageAccountDetialsProps) {
  return (
    <>
      <ManageAccountControls
        isOpen={isOpen}
        showFormHandler={showFormHandler}
        closeFormHandler={closeFormHandler}
      />
      <Stack gap={4}>
        {isOpen ? (
          <UpdateAccountDetailsForm
            user={user}
            handleClose={closeFormHandler}
          />
        ) : (
          <AccountDetails user={user} />
        )}
      </Stack>
    </>
  );
}

export default ManageAccountDetails;
