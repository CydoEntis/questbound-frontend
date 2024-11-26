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
