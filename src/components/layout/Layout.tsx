import {
	AppShell,
	Box,
	Burger,
	Container,
	Flex,
	Group,
	Image,
	Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "@tanstack/react-router";

import Logo from "../../assets/logo.png";
import NavButton from "../buttons/NavButton";
import ThemeToggle from "../theme/ThemeToggle";
import TopBar from "./TopBar";

export function Layout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { desktop: true, mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<TopBar
					isAuthenticated={true}
					opened={opened}
					toggle={toggle}
				/>
			</AppShell.Header>

			<AppShell.Navbar
				py="md"
				px={16}
			>
				<Stack
					justify="space-between"
					h="100%"
				>
					<Box>Something goes here soon</Box>
					<Flex
						direction={{ base: "row" }}
						gap="xs"
						w="100%"
					>
						<NavButton
							text="Login"
							to="/login"
							variant={"subtle"}
							fullWidth
						/>
						<NavButton
							text="Register"
							to="/register"
							variant={"outline"}
							fullWidth
						/>
					</Flex>
				</Stack>
			</AppShell.Navbar>

			<AppShell.Main px={0}>
				<Container size="lg">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
