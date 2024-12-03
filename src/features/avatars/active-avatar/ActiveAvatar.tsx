import { Avatar } from "@mantine/core";
import { forwardRef } from "react";
import { UserAvatar } from "../../auth/shared/types";

type ActiveAvatarProps = {
	avatar: UserAvatar;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
};


const ActiveAvatar = forwardRef<HTMLDivElement, ActiveAvatarProps>(
	({ avatar, size = "md" }, ref) => {
		return (
			<Avatar
				ref={ref}
				src={`https://localhost:7059${avatar.imageUrl}`}
				alt={avatar.name}
				bg="violet"
				size={size}
			/>
		);
	},
);

export default ActiveAvatar;
