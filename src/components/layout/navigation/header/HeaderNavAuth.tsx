import { Flex, Group, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

type HeaderNavAuthProps = {
	mobileNavToggle: ReactElement;
};

function HeaderNavAuth({ mobileNavToggle }: HeaderNavAuthProps) {
	return (
		<Flex
			align="center"
			justify="space-between"
			h="100%"
			px={16}
		>
			<Title component={Link}>Questbound</Title>

			<Group>{mobileNavToggle}</Group>
		</Flex>
	);
}

export default HeaderNavAuth;
