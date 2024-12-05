import { Avatar as MantineAvatar } from "@mantine/core";
import { forwardRef } from "react";
import { UserAvatar } from "../shared/types";
import styles from "./avatar.module.css";

type AvatarProps = {
  avatar: UserAvatar;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ avatar, size = "md", onClick }, ref) => {
    return (
      <MantineAvatar
        onClick={onClick}
        className={styles.avatar}
        ref={ref}
        src={`https://localhost:7059${avatar.imageUrl}`}
        alt={avatar.name}
        bg="violet"
        size={size}
      />
    );
  }
);

export default Avatar;
