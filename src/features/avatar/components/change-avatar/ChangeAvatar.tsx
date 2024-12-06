import { Popover, SimpleGrid, Text, UnstyledButton } from "@mantine/core";
import styles from "./change-avatar.module.css";

import Avatar from "../avatar-display/AvatarDisplay";
import { useGetUnUnlockableAvatars, useUpdateAvatar } from "../../api/avatar";
import { UserAvatar } from "../../shared/avatar.types";
import SelectedAvatar from "../selected-avatar/SelectedAvatar";

type ChangeAvatarProps = {
  avatar: UserAvatar;
  activeAvatar: UserAvatar;
};

function ChangeAvatar({ avatar, activeAvatar }: ChangeAvatarProps) {
  const { data: unUnlockableAvatars, isPending, isError } = useGetUnUnlockableAvatars();
  const updateAvatar = useUpdateAvatar();
  return (
    <Popover position="bottom" offset={0}>
      <Popover.Target>
        <UnstyledButton className={styles["change-avatar"]}>
          <div className={styles["overlay"]}></div>
          <Avatar size="xl" avatar={avatar} />
          <Text className={styles["change-text"]} c="white">
            Change
          </Text>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        {isPending || !unUnlockableAvatars ? (
          <Text>Loading...</Text>
        ) : (
          <SimpleGrid cols={4}>
            {unUnlockableAvatars.map((avatar) =>
              activeAvatar.id === avatar.id ? (
                <SelectedAvatar key={avatar.id} avatar={avatar} />
              ) : (
                <Avatar
                  onClick={() => updateAvatar.mutateAsync(avatar.id)}
                  key={avatar.id}
                  avatar={avatar}
                />
              )
            )}
          </SimpleGrid>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

export default ChangeAvatar;
