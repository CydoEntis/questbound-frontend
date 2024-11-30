import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import useAuthStore from "./stores/useAuthStore";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: {
		authState: useAuthStore.getState(), // Get the actual state, not the type
		queryClient,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AnimatePresence mode="wait">
				<RouterProvider
					router={router}
					context={{ authState: useAuthStore.getState(), queryClient }}
				/>
			</AnimatePresence>
		</QueryClientProvider>
	);
}

export default App;
