import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import accountService from "../features/account/api/account.service";
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

    try {
      await context.queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: accountService.getUserDetails,
      });
    } catch (error) {
      console.error("Error prefetching user details:", error);
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />;
}
