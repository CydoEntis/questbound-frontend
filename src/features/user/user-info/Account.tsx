import {
  Avatar,
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
} from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { User } from "../../auth/shared/types";
import UserLevel from "../user-level/UserLevel";

import classes from "./user-info.module.css";
import ActiveAvatar from "../../avatars/active-avatar/ActiveAvatar";
import { getPercentage } from "../utils/utils";
import { useDisclosure } from "@mantine/hooks";

type UserInfoProps = {
  user: User;
  //   onOpen: () => void;
};

function UserInfo({ user }: UserInfoProps) {
  const [
    isChangeAvatarOpened,
    { open: openChangeAvatar, close: closeChangeAvatar },
  ] = useDisclosure(false);
  const [
    isChangePasswordOpened,
    { open: openChangePassword, close: closeChangePassword },
  ] = useDisclosure(false);

  const percentage = getPercentage(user.currentExp, user.expToNextLevel);
  return (
    <>
      <Modal opened={isChangeAvatarOpened} onClose={closeChangeAvatar}>
        <ScrollArea h={250}>
          <SimpleGrid cols={3} spacing="xs">
            {/* {unlockedAvatars?.map((avatar) => (
              <Avatar avatar={avatar} />
            ))} */}
          </SimpleGrid>
        </ScrollArea>
      </Modal>
      <Modal opened={isChangePasswordOpened} onClose={closeChangePassword}>
        <p>Change Password</p>
      </Modal>

      <Menu shadow="md" withArrow>
        <Menu.Target>
          <Paper className={classes.userInfo} withBorder>
            <Flex px={12} py={8} justify="space-between" align="center">
              <Group>
                <ActiveAvatar avatar={user.avatar} />
                <Stack gap={2}>
                  <Text>{user.username}</Text>
                </Stack>
              </Group>
              <ChevronRight size={16} />
            </Flex>
            <Flex
              px={12}
              py={2}
              w="100%"
              justify="space-between"
              align="center"
            >
              <Text size="xs">Lv. {user.currentLevel}</Text>
              <Text size="xs">
                {user.currentExp} / {user.expToNextLevel}
              </Text>
            </Flex>
            <Progress
              radius={0}
              value={percentage}
              size="xs"
              animated
              color="violet"
            />
          </Paper>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account Settings</Menu.Label>
          <Menu.Item onClick={openChangeAvatar}>Change Avatar</Menu.Item>
          <Menu.Item onClick={openChangePassword}>Change Password</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default UserInfo;
