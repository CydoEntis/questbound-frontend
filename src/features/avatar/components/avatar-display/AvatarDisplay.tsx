import { Avatar as MantineAvatar } from "@mantine/core";
import { forwardRef } from "react";
import styles from "./avatar-display.module.css";
import { UserAvatar } from "../../shared/avatar.types";

type AvatarDisplayProps = {
  avatar: UserAvatar;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const AvatarDisplay = forwardRef<HTMLDivElement, AvatarDisplayProps>(
  ({ avatar, size = "md", onClick }, ref) => {
    return (
      <MantineAvatar
        onClick={onClick}
        className={styles.avatar}
        ref={ref}
        src={`https://questbound.xyz${avatar.imageUrl}`}
        alt={avatar.name}
        bg="violet"
        size={size}
      />
    );
  }
);

export default AvatarDisplay;
