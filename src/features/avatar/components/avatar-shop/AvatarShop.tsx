import {
  Box,
  Divider,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from "@mantine/core";
import AvatarDisplay from "../avatar-display/AvatarDisplay";
import LockedAvatar from "../locked-avatar/LockedAvatar";
import UnlockAvatarModal from "../unlock-avatar-modal/UnlockAvatarModal";
import { useGetUnlockableAvatars } from "../../api/avatar";
import { UnlockableAvatar } from "../../shared/avatar.types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { AuthenticatedUser } from "../../../account/shared/account.types";

import Gold from "../../../../assets/gold.png";

type AvatarShopProps = {
  avatarShopOpen: boolean;
  closeAvatarShop: () => void;
  user: AuthenticatedUser;
};

function AvatarShop({
  avatarShopOpen,
  closeAvatarShop,
  user,
}: AvatarShopProps) {
  const { data: unlockableAvatars } = useGetUnlockableAvatars();

  const groupedByTier =
    unlockableAvatars?.reduce(
      (acc, avatar) => {
        if (!acc[avatar.tier]) {
          acc[avatar.tier] = [];
        }
        acc[avatar.tier].push(avatar);
        return acc;
      },
      {} as { [tier: number]: UnlockableAvatar[] }
    ) || {};

  const [
    confirmUnlockOpened,
    { open: openUnlockAvatar, close: closeUnlockAvatar },
  ] = useDisclosure(false);

  const [avatarToUnlock, setAvatarToUnlock] = useState<UnlockableAvatar | null>(
    null
  );

  const avatarSelectionHandler = (avatar: UnlockableAvatar) => {
    setAvatarToUnlock(avatar);
    openUnlockAvatar();
  };

  return (
    <Modal
      size="lg"
      opened={avatarShopOpen}
      onClose={closeAvatarShop}
      title="Avatar Shop"
    >
      <UnlockAvatarModal
        isUnlockAvatarOpen={confirmUnlockOpened}
        onCloseUnlockAvatar={closeUnlockAvatar}
        avatarToUnlock={avatarToUnlock}
      />

      <Text>Your balance</Text>
      <Group gap={4}>
        <Text>{user?.gold}</Text>
        <Image src={Gold} w={20} />
      </Group>
      <Stack>
        {Object.keys(groupedByTier).map((tier) => {
          const avatarsByTier = groupedByTier[+tier];
          const unlockLevel = avatarsByTier[0]?.unlockLevel;

          return (
            <Box key={tier} pos="relative">
              <Divider
                my="xs"
                label={`Tier ${tier} (unlocked at level ${unlockLevel})`}
                labelPosition="center"
              />

              <SimpleGrid cols={10} spacing="xs">
                {avatarsByTier.map((avatar) =>
                  avatar.isUnlocked ? (
                    <AvatarDisplay size="lg" key={avatar.id} avatar={avatar} />
                  ) : (
                    <Stack gap={4}>
                      <LockedAvatar
                        size="lg"
                        key={avatar.id}
                        avatar={avatar}
                        onClick={() => avatarSelectionHandler(avatar)}
                      />
                      <Flex gap={4} justify="center" align="center">
                        <Image src={Gold} w={10} />
                        <Text size="xs">{avatarToUnlock?.unlockCost}</Text>
                      </Flex>
                    </Stack>
                  )
                )}
              </SimpleGrid>
            </Box>
          );
        })}
      </Stack>
    </Modal>
  );
}

export default AvatarShop;
