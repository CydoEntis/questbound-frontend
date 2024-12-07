import { Group, Modal, Text, Image } from "@mantine/core";
import UnlockAvatarModal from "../unlock-avatar-modal/UnlockAvatarModal";
import { useGetUnlockableAvatars } from "../../api/avatar";
import { UnlockableAvatar } from "../../shared/avatar.types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { AuthenticatedUser } from "../../../account/shared/account.types";

import Gold from "../../../../assets/gold.png";
import UnlockableAvatarList from "../unlockable-avatar-list/UnlockableAvatarList";

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
      {isPending ? (
        <Text>Loading...</Text>
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
