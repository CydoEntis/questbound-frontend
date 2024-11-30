import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context }) => {
		const isAuthenticated = context.authState.checkIsAuthenticated();
		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />
}
