import { Box, Popover, SimpleGrid, Text, UnstyledButton } from "@mantine/core";
import { Check } from "lucide-react"; // Import Check Icon
import styles from "./change-avatar.module.css";
import { UserAvatar } from "../shared/types";
import Avatar from "../avatar/Avatar";
import {
  useGetUnlockedAvatars,
  useUpdateUserAvatar,
} from "../../account/api/user";
import SelectionOverlay from "../selected-avatar/SelectionOverlay";
import SelectedAvatar from "../selected-avatar/SelectedAvatar";

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
