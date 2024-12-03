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
} from "@mantine/core";
import { ChevronRight } from "lucide-react";
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
  const [
    isUpdateAvatarOpened,
    { open: openUpdateAvatar, close: closeUpdateAvatar },
  ] = useDisclosure(false);
  const [
    isUpdatePasswordOpened,
    { open: openUpdatePassword, close: closeUpdatePassword },
  ] = useDisclosure(false);

  const [
    isUpdateProfileOpen,
    { open: openUpdateProfile, close: closeUpdateProfile },
  ] = useDisclosure(false);

  const percentage = getPercentage(user.currentExp, user.expToNextLevel);
  return (
    <>
      <Modal
        opened={isUpdateAvatarOpened}
        onClose={closeUpdateAvatar}
        title="Change Your Avatar"
      >
        <ScrollArea h={250}>
          <SimpleGrid cols={3} spacing="xs">
            {/* {unlockedAvatars?.map((avatar) => (
              <Avatar avatar={avatar} />
            ))} */}
          </SimpleGrid>
        </ScrollArea>
      </Modal>
      <Modal
        opened={isUpdateProfileOpen}
        onClose={closeUpdateProfile}
        title="Change Your Password"
      >
        <ChangePassword />
      </Modal>
      <Modal
        opened={isUpdatePasswordOpened}
        onClose={closeUpdatePassword}
        title="Change Your Password"
      >
        <ChangePassword />
      </Modal>

      <Menu shadow="md" withArrow>
        <Menu.Target>
          <Paper className={styles.profile} withBorder bg="card">
            <Flex w="100%" h="100%" align="center">
              <Box w="90%" p={8}>
                <Stack gap={2}>
                  <Flex gap={8}>
                    <Avatar avatar={user.avatar} />
                    <Stack gap={2} w="100%">
                      <Flex justify="space-between">
                        <Title size="md">{user.username}</Title>
                        <Group gap={4} align="center" justify="center">
                          <Text size="xs">{user.gold}</Text>
                          <Image w={12} src={Gold} />
                        </Group>
                      </Flex>
                      <Text size="xs">{user.email}</Text>
                    </Stack>
                  </Flex>
                  <Stack gap={4} pt={8}>
                    <Flex justify="space-between">
                      <Text size="xs">Lv: {user.currentLevel}</Text>
                      <Text size="xs">
                        {user.expToNextLevel - user.currentExp} exp to go
                      </Text>
                    </Flex>
                    <Box w="100%">
                      <Progress
                        radius="sm"
                        value={percentage}
                        size="md"
                        animated
                        color="violet"
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              <Box w="10%" bg="secondary" h="100%">
                <Stack justify="center" align="center" h="100%">
                  <ChevronRight size={20} />
                </Stack>
              </Box>
            </Flex>
          </Paper>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Profile Options</Menu.Label>
          <Menu.Item onClick={openUpdateAvatar}>Update Avatar</Menu.Item>
          <Menu.Item onClick={openUpdateProfile}>Update Profile</Menu.Item>
          <Menu.Item onClick={openUpdatePassword}>Update Password</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default UserInfo;
