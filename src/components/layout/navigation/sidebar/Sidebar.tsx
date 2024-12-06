import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "../../../../stores/useAuthStore";
import SidebarNavAuth from "./SidebarNavAuth";
import {
  Group,
  Modal,
  Image,
  Text,
  Stack,
  Box,
  SimpleGrid,
  Divider,
  Flex,
} from "@mantine/core";
import Gold from "../../../../assets/gold.png";
import { useGetUnlockableAvatars } from "../../../../features/avatar/api/avatar";
import {
  UnlockableAvatar,
  UserAvatar,
} from "../../../../features/avatar/shared/avatar.types";
import AvatarDisplay from "../../../../features/avatar/components/avatar-display/AvatarDisplay";
import LockedAvatar from "../../../../features/avatar/components/locked-avatar/LockedAvatar";
import { useState } from "react";
import UnlockAvatarModal from "../../../../features/avatar/components/unlock-avatar-modal/UnlockAvatarModal";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const { user } = useAuthStore();
  const { data: unlockableAvatars } = useGetUnlockableAvatars();

  const [avatarShopOpen, { open: openAvatarShop, close: closeAvatarShop }] =
    useDisclosure(false);

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
    <>
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
                      <AvatarDisplay
                        size="lg"
                        key={avatar.id}
                        avatar={avatar}
                      />
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
      <SidebarNavAuth
        user={user!}
        closeNav={onClose}
        onOpenAvatarShop={openAvatarShop}
      />
    </>
  );
}

export default Sidebar;
