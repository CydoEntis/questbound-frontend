import { Container, Group, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import NavButton from "../../../buttons/NavButton";
import ThemeToggle from "../../../theme/ThemeToggle";
import { ReactElement } from "react";

type HeaderNavGuestProps = { mobileNavToggle: ReactElement };

function HeaderNavGuest({ mobileNavToggle }: HeaderNavGuestProps) {
	return (
		<Container
			size="lg"
			h="100%"
		>
			<Group
				h="100%"
				align="center"
			>
				<Group
					justify="space-between"
					align="center"
					style={{ flex: 1 }}
				>
					<Title component={Link}>CollabParty</Title>
					<Group
						ml="xl"
						gap={8}
						visibleFrom="xs"
					>
						<NavButton
							text="Login"
							to="/login"
							variant={"subtle"}
						/>
						<NavButton
							text="Register"
							to="/register"
							variant={"outline"}
						/>
						<ThemeToggle />
					</Group>
					{mobileNavToggle}
				</Group>
			</Group>
		</Container>
	);
}

export default HeaderNavGuest;
