import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Image,
} from "@mantine/core";

import { AxiosError } from "axios";
import { useState } from "react";
import { UnlockableAvatar } from "../../shared/avatar.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";
import Gold from "../../../../assets/gold.png";
import { useUnlockAvatar } from "../../api/avatar";
import useUserStore from "../../../../stores/useUserStore";

type ConfirmUnlockAvatarModalProps = {
  isUnlockAvatarOpen: boolean;
  onCloseUnlockAvatar: () => void;
  avatarToUnlock: UnlockableAvatar | null;
};

function ConfirmUnlockAvatarModal({
  isUnlockAvatarOpen,
  onCloseUnlockAvatar,
  avatarToUnlock,
}: ConfirmUnlockAvatarModalProps) {
  const unlockAvatar = useUnlockAvatar();
  const { updateUserGold } = useUserStore();
  const [error, setError] = useState<Record<string, string>>();
  const unlockAvatarHandler = async () => {
    try {
      if (avatarToUnlock) {
        await unlockAvatar.mutateAsync(avatarToUnlock.id);
        updateUserGold(avatarToUnlock.unlockCost);
        onCloseUnlockAvatar();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors = error.response.data.errors as Record<string, string[]>;
        const fieldErrors: Record<string, string> = {};

        for (const [key, messages] of Object.entries(errors)) {
          if (Array.isArray(messages) && messages.length > 0) {
            fieldErrors[key] = messages[0];
          }
        }

        setError(fieldErrors);
      }
    }
  };

  return (
    <Modal
      opened={isUnlockAvatarOpen}
      onClose={onCloseUnlockAvatar}
      title="Unlock Avatar?"
      centered
    >
      <Text ta="center">Are you sure you want to unlock this avatar?</Text>

      <Text size="xs" c="red" ta="center">
        Action cannot be undone.
      </Text>
      <Center pt={12}>
        <Stack gap={4}>
          <AvatarDisplay avatar={avatarToUnlock!} size="xl" />
          <Text>{avatarToUnlock?.displayName}</Text>
          <Group gap={4} justify="center" align="center">
            <Image src={Gold} w={15} />
            <Text size="sm">{avatarToUnlock?.unlockCost}</Text>
          </Group>
        </Stack>
      </Center>
      <Box>
        {Object.entries(error || {}).map(([field, message]) => (
          <Text pt={8} size="xs" c="red" ta="center" key={field}>
            {message}
          </Text>
        ))}
      </Box>

      <Flex justify="space-evenly" gap={8} mt={20}>
        <Button
          w="100%"
          variant="light"
          color="violet"
          onClick={unlockAvatarHandler}
        >
          Confirm
        </Button>
        <Button
          w="100%"
          variant="light"
          color="gray"
          onClick={onCloseUnlockAvatar}
        >
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
}

export default ConfirmUnlockAvatarModal;
