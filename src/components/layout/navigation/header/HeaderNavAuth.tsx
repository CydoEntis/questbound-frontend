import { Flex, Group, Image } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

import Logo from "../../../../assets/logo.png";

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
			<Image src={Logo} w={200}/>

			<Group>{mobileNavToggle}</Group>
		</Flex>
	);
}

export default HeaderNavAuth;
