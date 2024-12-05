import SelectionOverlay from "./SelectionOverlay";
import { Box } from "@mantine/core";
import Avatar from "../avatar/Avatar";
import { UserAvatar } from "../shared/types";
import styles from "./selected-avatar.module.css";

type SelectedAvatarProps = {
  avatar: UserAvatar;
};

function SelectedAvatar({ avatar }: SelectedAvatarProps) {
  return (
    <Box key={avatar.id} className={styles["selected-avatar"]}>
      <SelectionOverlay />
      <Avatar avatar={avatar} />
    </Box>
  );
}

export default SelectedAvatar;
