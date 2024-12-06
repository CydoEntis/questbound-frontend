import { Flex, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import ManageAccountDetails from "../update-account/UpdateAccount";
import { AuthenticatedUser } from "../../shared/account.types";
import AccountLevel from "../account-level/AccountLevel";
import ChangePassword from "../../../auth/components/change-password/ChangePassword";
import ChangeAvatar from "../../../avatar/components/change-avatar/ChangeAvatar";

type AccountModalProps = {
  user: AuthenticatedUser;
  isProfileOpen: boolean;
  handleCloseProfile: () => void;
};

function AccountModal({
  user,
  isProfileOpen,
  handleCloseProfile,
}: AccountModalProps) {
  const [showAccountUpdateForm, setShowAccountUpdateForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const closeAndReset = () => {
    setShowChangePasswordForm(false);
    setShowAccountUpdateForm(false);
    handleCloseProfile();
  };

  return (
    <Modal opened={isProfileOpen} onClose={closeAndReset} title="Profile">
      <Stack gap={2}>
        <Flex gap={16} align="center" w="100%" pos="relative">
          <ChangeAvatar activeAvatar={user.avatar} avatar={user.avatar} />
          <ManageAccountDetails
            user={user}
            isOpen={showAccountUpdateForm}
            closeFormHandler={() => setShowAccountUpdateForm(false)}
            showFormHandler={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setShowAccountUpdateForm(true);
            }}
          />
        </Flex>
        <AccountLevel user={user} />
      </Stack>
      <ChangePassword
        isOpened={showChangePasswordForm}
        closeFormHandler={() => setShowChangePasswordForm(false)}
        showFormHandler={() => setShowChangePasswordForm(true)}
      />
    </Modal>
  );
}

export default AccountModal;
