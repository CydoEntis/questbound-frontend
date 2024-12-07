import {
  Box,
  Image,
  Text,
  Stack,
  Divider,
  SimpleGrid,
  Flex,
} from "@mantine/core";
import AvatarDisplay from "../avatar-display/AvatarDisplay";
import LockedAvatar from "../locked-avatar/LockedAvatar";
import { UnlockableAvatar } from "../../shared/avatar.types";
import Gold from "../../../../assets/gold.png";

type UnlockableAvatarListProps = {
  unlockableAvatars: UnlockableAvatar[];
  onOpenUnlockAvatar: () => void;
  onSetAvatarToUnlock: (avatar: UnlockableAvatar) => void;
};

function UnlockableAvatarList({
  unlockableAvatars,
  onOpenUnlockAvatar,
  onSetAvatarToUnlock,
}: UnlockableAvatarListProps) {
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

  const avatarSelectionHandler = (avatar: UnlockableAvatar) => {
    onSetAvatarToUnlock(avatar);
    onOpenUnlockAvatar();
  };

  return (
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
                      <Text size="xs">{avatar?.unlockCost}</Text>
                    </Flex>
                  </Stack>
                )
              )}
            </SimpleGrid>
          </Box>
        );
      })}
    </Stack>
  );
}

export default UnlockableAvatarList;
