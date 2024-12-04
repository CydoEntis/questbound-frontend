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
import { Edit } from "lucide-react";
import Avatar from "../../avatars/active-avatar/ActiveAvatar";
import { User } from "../../auth/shared/types";
import { getPercentage } from "../../user/utils/utils";
import styles from "./account-modal.module.css";

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
          <ActionIcon
            variant="light"
            color="violet"
            pos="absolute"
            top={5}
            right={5}
          >
            <Edit size={20} />
          </ActionIcon>
          <Stack gap={4}>
            <Title size="1.75rem">{user.username}</Title>
            <Text>{user.email}</Text>
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
      <Flex justify="end" pt={8}>
        <Button variant="outline" color="violet">
          Change Password
        </Button>
      </Flex>
      {/* <Box>
      <KeySquare />
      <Text>Need to change your password?</Text>
    </Box> */}
      {/* <ChangePassword /> */}
    </Modal>
  );
}

export default AccountModal;
