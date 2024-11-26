import {
	AppShell,
	Burger,
	Button,
	Center,
	Container,
	Drawer,
	Flex,
	Group,
	Image,
	NavLink,
	Stack,
} from "@mantine/core";

import Logo from "../../assets/logo.png";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "../theme/ThemeToggle";

function TopNavbar() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const { isLightMode } = useGetColorTheme();

	return (
		<>
			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				title={
					<Image
						src={Logo}
						height={50}
					/>
				}
				size="sm"
				padding="md"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<Stack>
					<Stack>
						<NavLink></NavLink>
					</Stack>
					<Stack>
						<Button
							component={Link}
							to="/login"
							variant="light"
							color="violet"
						>
							Log in
						</Button>
						<Button
							component={Link}
							to="/register"
							variant="filled"
							color="violet"
						>
							Sign up
						</Button>
					</Stack>
				</Stack>
			</Drawer>

			<AppShell.Header
				bg="secondary"
				styles={{
					header: {
						borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
					},
				}}
			>
				<Container size="xl">
					<Center>
						<Flex
							h="100%"
							w="100%"
							justify="space-between"
							align="center"
						>
							<Image
								src={Logo}
								w={100}
							/>

							<Group visibleFrom="sm">
								<Button variant="default">Log in</Button>
								<Button>Sign up</Button>
								<ThemeToggle />
							</Group>

							<Burger
								opened={drawerOpened}
								onClick={toggleDrawer}
								hiddenFrom="sm"
							/>
						</Flex>
					</Center>
				</Container>
			</AppShell.Header>
		</>
	);
}

export default TopNavbar;
