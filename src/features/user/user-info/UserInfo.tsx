import { Flex, Paper } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { User } from "../../auth/shared/types";
import UserLevel from "../user-level/UserLevel";

import classes from "./user-info.module.css";

type UserInfoProps = { user: User; onOpen: () => void };

function UserInfo({ user, onOpen }: UserInfoProps) {
	return (
		<>
			<Paper
				p={16}
				className={classes.userInfo}
				withBorder
				onClick={onOpen}
			>
				<Flex
					justify="space-between"
					align="center"
				>
					<UserLevel user={user!} />
					<ChevronRight size={16} />
				</Flex>
			</Paper>
		</>
	);
}

export default UserInfo;
