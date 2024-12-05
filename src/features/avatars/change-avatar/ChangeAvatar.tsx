import { Box, Text } from "@mantine/core";
import styles from "./change-avatar.module.css";
import { UserAvatar } from "../shared/types";
import Avatar from "../avatar/Avatar";

type ChangeAvatarProps = {
  avatar: UserAvatar;
};

function ChangeAvatar({ avatar }: ChangeAvatarProps) {
  // const { getUnlockedAvatars, unlockedAvatars } = useAvatarStore();

  // useEffect(() => {
  // 	const fetchUnlockedAvatars = async () => {
  // 		await getUnlockedAvatars();
  // 	};

  // 	fetchUnlockedAvatars();
  // }, []);

  return (
    <Box className={styles["change-avatar"]}>
      <div className={styles["overlay"]}></div>
      <Avatar size="xl" avatar={avatar} />
      <Text className={styles["change-text"]} c="white">
        Change
      </Text>
    </Box>
  );
}

export default ChangeAvatar;
