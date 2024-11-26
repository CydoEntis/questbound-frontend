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
							<Link to="/">
								<Image
									src={Logo}
									h={40}
								/>
							</Link>
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
							</Group>
							<Burger
								opened={opened}
								onClick={toggle}
								hiddenFrom="xs"
								size="sm"
							/>
						</Group>
					</Group>
				</Container>
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
