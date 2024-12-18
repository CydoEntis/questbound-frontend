import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import localStorageService from "../api/services/localStorage.service";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = localStorageService.getItem<{
      isAuthenticated: boolean;
    }>("questbound");
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }

    context.authState.loginUser();

  },
  component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />;
}
