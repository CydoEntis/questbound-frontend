import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createRootRouteWithContext, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Layout } from "../components/layout/Layout";

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
		<MantineProvider defaultColorScheme="auto">
			<Layout />
			<ReactQueryDevtools buttonPosition="bottom-right" />
			<TanStackRouterDevtools />
		</MantineProvider>
	);
}
