import { ActionIcon, Flex, Stack } from "@mantine/core";
import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { User } from "../../auth/shared/types";
import UpdateUsernameForm from "../update-username/UpdateUsername";
import UsernameDetail from "../username-detail/UsernameDetail";
import UserLevel from "../user-level/UserLevel";
// import AccountLevel from "../account/AccountLevel";

type UserDetailsProps = { user: User };

function UserDetails({ user }: UserDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsEditing(true);
	};

	const updateHandler = () => {
		setIsEditing(false);
	};

	return (
		<Stack
			gap={12}
			w="100%"
		>
			<Flex justify="space-between">
				{isEditing ? (
					<>
						<UpdateUsernameForm
							user={user}
							onClose={updateHandler}
						/>
						<ActionIcon
							variant="light"
							color="violet"
							type="submit"
							form="updateUsernameForm"
						>
							<Save size={20} />
						</ActionIcon>
					</>
				) : (
					<>
						<UsernameDetail user={user} />
						<ActionIcon
							variant="light"
							color="violet"
							type="button"
							onClick={editHandler}
						>
							<Edit size={20} />
						</ActionIcon>
					</>
				)}
			</Flex>
			{/* <UserLevel user={user} /> */}
		</Stack>
	);
}

export default UserDetails;
