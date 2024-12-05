import { Flex, Paper, Portal, Stack, Text, Title } from "@mantine/core";
import { ChevronRight } from "lucide-react";

import { useDisclosure } from "@mantine/hooks";
import styles from "./account-button.module.css";
import AccountModal from "../modals/AccountModal";
import { AuthenticatedUser } from "../../shared/account.types";
import Avatar from "../../../../components/avatars/Avatar";

type AccountButtonProps = {
  user: AuthenticatedUser;
};

function AccountButton({ user }: AccountButtonProps) {
  const [isProfileOpen, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);

  return (
    <>
      <Portal>
        <AccountModal
          user={user}
          isProfileOpen={isProfileOpen}
          handleCloseProfile={closeProfile}
        />
      </Portal>
      <Paper
        onClick={openProfile}
        className={styles["account-btn"]}
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

export default AccountButton;
