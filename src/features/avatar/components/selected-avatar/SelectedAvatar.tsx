import { Box } from "@mantine/core";
import styles from "./selected-avatar.module.css";
import SelectionOverlay from "../../../../components/overlays/SelectionOverlay";
import { UserAvatar } from "../../shared/avatar.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";
import { Check } from "lucide-react";

type SelectedAvatarProps = {
  avatar: UserAvatar;
};

function SelectedAvatar({ avatar }: SelectedAvatarProps) {
  return (
    <Box key={avatar.id} className={styles["selected-avatar"]}>
      <SelectionOverlay>
        <Check size={24} color="white" className={styles.check} />
      </SelectionOverlay>
      <AvatarDisplay avatar={avatar} />
    </Box>
  );
}

export default SelectedAvatar;
