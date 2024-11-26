import { Flex, Group, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

type AuthenticatedNavProps = {
	mobileNavToggle: ReactElement;
};

function AuthenticatedNav({ mobileNavToggle }: AuthenticatedNavProps) {
	return (
		<Flex
			align="center"
			justify="space-between"
			h="100%"
			px={16}
		>
			<Title component={Link}>CollabParty</Title>

			<Group>{mobileNavToggle}</Group>
		</Flex>
	);
}

export default AuthenticatedNav;
