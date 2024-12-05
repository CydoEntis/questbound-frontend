import { Popover, SimpleGrid, Text, UnstyledButton } from "@mantine/core";
import styles from "./change-avatar.module.css";

import { useGetUnlockedAvatars, useUpdateUserAvatar } from "../../api/account";
import SelectedAvatar from "../../../../components/avatars/SelectedAvatar";
import { UserAvatar } from "../../shared/account.types";
import Avatar from "../../../../components/avatars/Avatar";

type ChangeAvatarProps = {
  avatar: UserAvatar;
  activeAvatar: UserAvatar;
};

function ChangeAvatar({ avatar, activeAvatar }: ChangeAvatarProps) {
  const { data: unlockedAvatars, isPending, isError } = useGetUnlockedAvatars();
  const updateAvatar = useUpdateUserAvatar();
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
        {isPending || !unlockedAvatars ? (
          <Text>Loading...</Text>
        ) : (
          <SimpleGrid cols={4}>
            {unlockedAvatars.map((avatar) =>
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
