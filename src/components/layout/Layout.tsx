import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation } from "@tanstack/react-router";

import TopBar from "./navigation/header/Header";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import Sidebar from "./navigation/sidebar/Sidebar";
import SlideInRightTransition from "../page-transitions/SlideInRightTransition";

export function Layout() {
	const isLightMode = useGetColorTheme();
	const [opened, { toggle, close }] = useDisclosure();
	const location = useLocation();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Header>
				<TopBar
					isAuthenticated={false}
					opened={opened}
					toggle={toggle}
				/>
			</AppShell.Header>

			<AppShell.Navbar
				p="md"
				bg="secondary"
				style={{
					navbar: {
						borderColor: isLightMode ? "#DCDEE0" : "#3A3A3A",
						overflowY: "auto",
						height: "100vh",
					},
				}}
			>
				<Sidebar
					isAuthenticated={true}
					onClose={close}
				/>
			</AppShell.Navbar>

			<AppShell.Main>
				<SlideInRightTransition key={location.pathname}>
					<Outlet />
				</SlideInRightTransition>
			</AppShell.Main>
		</AppShell>
	);
}
