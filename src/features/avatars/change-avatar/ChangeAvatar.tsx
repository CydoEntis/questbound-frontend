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
						<Box className="relative">
							<Avatar
								src={`https://localhost:7059${user.avatar.imageUrl}`}
								alt="User's avatar"
								bg="violet"
								size="xl"
								className="cursor-pointer"
							/>

							<Paper
								radius="100%"
								bg="violet"
								p={6}
								withBorder
								className="absolute -bottom-1 right-0 cursor-pointer"
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
