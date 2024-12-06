import { Box } from "@mantine/core";
import styles from "./locked-avatar.module.css";
import SelectionOverlay from "../../../../components/overlays/SelectionOverlay";
import { UserAvatar } from "../../shared/avatar.types";
import AvatarDisplay from "../avatar-display/AvatarDisplay";
import { Lock } from "lucide-react";

type LockedAvatarProps = {
  avatar: UserAvatar;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onClick: () => void;
};

function LockedAvatar({ avatar, size, onClick }: LockedAvatarProps) {
  return (
    <Box
      key={avatar.id}
      className={styles["locked-avatar"]}
      w={56}
      h={56}
      onClick={onClick}
    >
      <SelectionOverlay>
        <Lock size={24} color="white" className={styles.lock} />
      </SelectionOverlay>
      <AvatarDisplay avatar={avatar} size={size} />
    </Box>
  );
}

export default LockedAvatar;
