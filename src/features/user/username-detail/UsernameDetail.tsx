import { Stack, Text } from "@mantine/core";
import { User } from "../../auth/shared/types";

type UsernameDetailProps = { user: User };

function UsernameDetail({ user }: UsernameDetailProps) {
	return (
		<Stack gap={0}>
			<Text size="xs">Display Name</Text>
			<Text size="xl">{user.username}</Text>
		</Stack>
	);
}

export default UsernameDetail;
