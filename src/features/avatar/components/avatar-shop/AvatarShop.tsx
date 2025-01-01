import {
  Group,
  Modal,
  Text,
  Image,
  Skeleton,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import ConfirmUnlockAvatarModal from "../confirm-avatar-unlock-modal/ConfirmAvatarUnlockModal";
import { useGetUnlockableAvatars } from "../../api/avatar";
import { UnlockableAvatar } from "../../shared/avatar.types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import Gold from "../../../../assets/gold.png";
import UnlockableAvatarList from "../unlockable-avatar-list/UnlockableAvatarList";
import { User } from "../../../account/shared/account.types";

type AvatarShopProps = {
  avatarShopOpen: boolean;
  closeAvatarShop: () => void;
  user: User;
};

function AvatarShop({
  avatarShopOpen,
  closeAvatarShop,
  user,
}: AvatarShopProps) {
  const { data: unlockableAvatars, isPending } = useGetUnlockableAvatars();

  const [
    confirmUnlockOpened,
    { open: openUnlockAvatar, close: closeUnlockAvatar },
  ] = useDisclosure(false);

  const [avatarToUnlock, setAvatarToUnlock] = useState<UnlockableAvatar | null>(
    null
  );

  return (
    <Modal
      size="lg"
      opened={avatarShopOpen}
      onClose={closeAvatarShop}
      title="Avatar Shop"
    >
      <ConfirmUnlockAvatarModal
        isUnlockAvatarOpen={confirmUnlockOpened}
        onCloseUnlockAvatar={closeUnlockAvatar}
        avatarToUnlock={avatarToUnlock}
      />

      <Text>Your balance</Text>
      <Group gap={4}>
        <Text>{user?.gold}</Text>
        <Image src={Gold} w={20} />
      </Group>
      {isPending ? (
        <Stack gap="md" mt={16}>
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex}>
              {/* Skeleton divider for the row */}
              <Skeleton h={10} w="100%" mb={20} />
              <SimpleGrid
                cols={{ base: 5, md: 10 }} // Default is 10 columns
                spacing="xs"
                my={8}
              >
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <Skeleton key={colIndex} w={50} h={50} radius="xl" />
                ))}
              </SimpleGrid>
            </div>
          ))}
        </Stack>
      ) : (
        <UnlockableAvatarList
          onOpenUnlockAvatar={openUnlockAvatar}
          unlockableAvatars={unlockableAvatars!}
          onSetAvatarToUnlock={setAvatarToUnlock}
        />
      )}
    </Modal>
  );
}

export default AvatarShop;
