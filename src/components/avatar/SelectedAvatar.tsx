import SelectionOverlay from "../overlays/SelectionOverlay";
import { Box } from "@mantine/core";
import styles from "./selected-avatar.module.css";
import Avatar from "../avatar/Avatar";
import { UserAvatar } from "../../features/account/shared/account.types";

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
