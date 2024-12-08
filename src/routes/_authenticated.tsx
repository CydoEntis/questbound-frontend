import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import accountService from "../features/account/api/account.service";
import localStorageService from "../api/services/localStorage.service";
import { Tokens } from "../features/auth/shared/auth.types";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = localStorageService.getItem<{isAuthenticated: boolean}>("questbound");
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }

    context.authState.loginUser();

    try {
      const user = await context.queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: accountService.getUserDetails,
      });

      context.authState.setUser(user);
    } catch (error) {
      throw redirect({ to: "/login" });
    }

    return; 
  },
  component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />;
}
