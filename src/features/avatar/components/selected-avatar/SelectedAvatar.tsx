import { Box } from "@mantine/core";
import styles from "./selected-avatar.module.css";
import SelectionOverlay from "../../../../components/overlays/SelectionOverlay";
import { UserAvatar } from "../../shared/avatar.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";

type SelectedAvatarProps = {
  avatar: UserAvatar;
};

function SelectedAvatar({ avatar }: SelectedAvatarProps) {
  return (
    <Box key={avatar.id} className={styles["selected-avatar"]}>
      <SelectionOverlay />
      <AvatarDisplay avatar={avatar} />
    </Box>
  );
}

export default SelectedAvatar;
