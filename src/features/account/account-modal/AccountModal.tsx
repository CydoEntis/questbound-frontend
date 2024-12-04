import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Progress,
  Stack,
  Title,
  Tooltip,
  Box,
  Text,
} from "@mantine/core";
import { Edit, Save } from "lucide-react";
import Avatar from "../../avatars/avatar/Avatar";
import { User } from "../../auth/shared/types";
import { getPercentage } from "../../user/utils/utils";
import styles from "./account-modal.module.css";
import { useState } from "react";
import UpdateAccountDetailsForm from "../update-account-details-form/UpdateAccountDetailsForm";
import ChangePassword from "../../auth/change-password/ChangePassword";

type AccountModalProps = {
  user: User;
  isProfileOpen: boolean;
  handleCloseProfile: () => void;
};

function AccountModal({
  user,
  isProfileOpen,
  handleCloseProfile,
}: AccountModalProps) {
  const percentage = getPercentage(user.currentExp, user.expToNextLevel);

  const [showAccontUpdateForm, setShowAccountUpdateForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const showUpdateAccountFormHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowAccountUpdateForm(true);
  };

  const closeUpdateAccountFormHandler = () => {
    setShowAccountUpdateForm(false);
  };

  const showChangePasswordHandler = () => {
    setShowChangePasswordForm(true);
  };

  const closeChangePasswordHandler = () => {
    setShowChangePasswordForm(false);
  };

  return (
    <Modal opened={isProfileOpen} onClose={handleCloseProfile} title="Profile">
      <Stack gap={2}>
        <Flex gap={16} align="center" w="100%" pos="relative">
          <Box className={styles.avatarWrapper}>
            <div className={styles.avatarOverlay}></div>
            <Avatar size="xl" avatar={user.avatar} />
            <Text className={styles.editIcon} c="white">
              Change
            </Text>
          </Box>
          {showAccontUpdateForm ? (
            <ActionIcon
              variant="light"
              color="violet"
              pos="absolute"
              top={5}
              right={5}
              form="updateAccountDetailsForm"
              type="submit"
            >
              <Save size={20} />
            </ActionIcon>
          ) : (
            <ActionIcon
              type="button"
              variant="light"
              color="violet"
              pos="absolute"
              top={5}
              right={5}
              onClick={showUpdateAccountFormHandler}
            >
              <Edit size={20} />
            </ActionIcon>
          )}
          <Stack gap={4}>
            {showAccontUpdateForm ? (
              <UpdateAccountDetailsForm
                user={user}
                handleClose={closeUpdateAccountFormHandler}
              />
            ) : (
              <>
                <Title size="1.75rem">{user.username}</Title>
                <Text>{user.email}</Text>
              </>
            )}
          </Stack>
        </Flex>
        <Stack gap={4} py={8} w="100%">
          <Text>Level: {user.currentLevel}</Text>
          <Tooltip
            label={`${user.expToNextLevel - user.currentExp} exp to go`}
            position="bottom"
          >
            <Progress
              w="100%"
              radius="md"
              value={percentage}
              size="md"
              animated
              color="violet"
            />
          </Tooltip>
        </Stack>
      </Stack>
      {showChangePasswordForm ? (
        <ChangePassword handleClose={closeChangePasswordHandler} />
      ) : (
        <Flex justify="end" pt={8}>
          <Button
            variant="outline"
            color="violet"
            onClick={showChangePasswordHandler}
          >
            Change Password
          </Button>
        </Flex>
      )}
    </Modal>
  );
}

export default AccountModal;
