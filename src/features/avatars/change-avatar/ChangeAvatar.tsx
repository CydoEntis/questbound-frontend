import {
	Avatar,
	Box,
	Paper,
	Popover,
	ScrollArea,
	SimpleGrid,
	Tooltip,
} from "@mantine/core";
// import { useEffect } from "react";
import { Edit2 } from "lucide-react";
import { User } from "../../auth/shared/types";
import classes from "./change-avatar.module.css";


type ChangeAvatarProps = {
	user: User;
};

function ChangeAvatar({ user }: ChangeAvatarProps) {
	// const { getUnlockedAvatars, unlockedAvatars } = useAvatarStore();

	// useEffect(() => {
	// 	const fetchUnlockedAvatars = async () => {
	// 		await getUnlockedAvatars();
	// 	};

	// 	fetchUnlockedAvatars();
	// }, []);

	return (
		<Popover
			position="bottom"
			withArrow
			shadow="md"
		>
			<Popover.Target>
				<Box>
					<Tooltip label="Change Avatar">
						<Box className={classes["change-avatar-container"]}>
							<Avatar
								src={`https://localhost:7059${user.avatar.imageUrl}`}
								alt="User's avatar"
								bg="violet"
								size="xl"
								className={classes["change-avatar-icon"]}
							/>

							<Paper
								radius="100%"
								bg="violet"
								p={6}
								withBorder
								className={classes["change-avatar-btn"]}
							>
								<Edit2 size={14} />
							</Paper>
						</Box>
					</Tooltip>
				</Box>
			</Popover.Target>
			<Popover.Dropdown>
				<ScrollArea h={250}>
					<SimpleGrid
						cols={3}
						spacing="xs"
					>
						{/* {unlockedAvatars?.map((avatar) => (
							<UnlockedAvatar
								user={user}
								avatar={avatar}
							/>
						))} */}
					</SimpleGrid>
				</ScrollArea>
			</Popover.Dropdown>
		</Popover>
	);
}

export default ChangeAvatar;
