import { Stack } from "@mantine/core";
import AccountDetails from "../account-details/AccountDetails";
import UpdateAccountDetailsForm from "../update-account-details-form/UpdateAccountDetailsForm";
import ManageAccountControls from "../manage-account-controls/ManageAccountControls";
import { AuthenticatedUser } from "../../auth/shared/types";

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
