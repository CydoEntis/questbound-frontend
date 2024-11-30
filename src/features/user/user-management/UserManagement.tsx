import { Box, Flex, Stack } from "@mantine/core";
// import ChangePassword from "./ChangePassword";
import ChangeAvatar from "../../avatars/change-avatar/ChangeAvatar";
import UserDetails from "../user-details/UserDetails";
import { User } from "../../auth/shared/types";
import NextUnlock from "../../avatars/next-unlock/NextUnlock";

type UserManagementProps = { user: User };

function UserManagement({ user }: UserManagementProps) {
	return (
		<Stack gap={20}>
			<Flex gap={30}>
				<ChangeAvatar user={user} />
				<UserDetails user={user} />
			</Flex>
			<NextUnlock user={user} />
			{/* <ChangePassword /> */}
		</Stack>
	);
}

export default UserManagement;
