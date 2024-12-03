import { Avatar as MantineAvatar } from "@mantine/core";
import { forwardRef } from "react";
import { UserAvatar } from "../../auth/shared/types";

type AvatarProps = {
  avatar: UserAvatar;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ avatar, size = "md" }, ref) => {
    return (
      <MantineAvatar
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
