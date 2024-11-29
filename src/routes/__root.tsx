import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createRootRouteWithContext, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Layout } from "../components/layout/Layout";
import theme from "../components/theme/theme.config";
import { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import LocalStorageService from "../features/auth/api/services/localStorage.service";
import { StoredUser } from "../features/auth/shared/types";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});

function RootComponent() {
	const { setUser, setTokens } = useAuthStore();
	useEffect(() => {
		const storedData = LocalStorageService.getItem<StoredUser>("collabparty");
		if (storedData) {
			setUser(storedData.user);
			setTokens(storedData.tokens);
		}
	}, []);

	return (
		<MantineProvider
			theme={theme}
			defaultColorScheme="auto"
		>
			<Notifications />
			<Layout />
			<ReactQueryDevtools buttonPosition="bottom-right" />
			<TanStackRouterDevtools />
		</MantineProvider>
	);
}
