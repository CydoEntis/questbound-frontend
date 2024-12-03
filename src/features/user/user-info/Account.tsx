import {
  Flex,
  Group,
  Menu,
  Modal,
  Paper,
  Progress,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Box,
  Image,
  Tooltip,
  ActionIcon,
  Center,
} from "@mantine/core";
import { ChevronRight, Edit } from "lucide-react";
import { User } from "../../auth/shared/types";

import styles from "./user-info.module.css";
import { getPercentage } from "../utils/utils";
import { useDisclosure } from "@mantine/hooks";
import ChangePassword from "../../auth/change-password/ChangePassword";
import Avatar from "../../avatars/active-avatar/ActiveAvatar";
import Gold from "../../../assets/gold.png";

type UserInfoProps = {
  user: User;
  //   onOpen: () => void;
};

function UserInfo({ user }: UserInfoProps) {
  const percentage = getPercentage(user.currentExp, user.expToNextLevel);

  const [isProfileOpen, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);

  return (
    <>
      <Modal opened={isProfileOpen} onClose={closeProfile} title="Profile">
        <Stack gap={2} align="center" justify="center">
          <Box className={styles.avatarWrapper}>
            <div className={styles.avatarOverlay}></div>
            <Avatar size="xl" avatar={user.avatar} />
            <Text className={styles.editIcon} c="white">
              Change
            </Text>
          </Box>
          <Title>{user.username}</Title>
          <Text>{user.email}</Text>
          <Group>
            <Text>Lv: {user.currentLevel}</Text>
            <Tooltip
              label={`${user.expToNextLevel - user.currentExp} exp to go`}
              position="bottom"
            >
              <Box miw="300px" maw="500px">
                <Progress
                  radius="md"
                  value={percentage}
                  size="md"
                  animated
                  color="violet"
                />
              </Box>
            </Tooltip>
          </Group>
        </Stack>
        <ChangePassword />
      </Modal>

      <Paper
        onClick={openProfile}
        className={styles.profile}
        withBorder
        bg="card"
        p={8}
      >
        <Flex w="100%" h="100%" align="center">
          <Stack gap={2} w="100%">
            <Flex align="center" gap={8}>
              <Avatar avatar={user.avatar} />
              <Flex justify="space-between" w="100%">
                <Stack gap={2}>
                  <Title size="md">{user.username}</Title>
                  <Text size="xs">Lv: {user.currentLevel}</Text>
                </Stack>
              </Flex>
            </Flex>
          </Stack>
          <Stack align="center" h="100%" justify="center">
            <ChevronRight size={20} />
          </Stack>
        </Flex>
      </Paper>
    </>
  );
}

export default UserInfo;
