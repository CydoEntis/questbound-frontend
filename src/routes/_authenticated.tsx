import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import localStorageService from "../api/services/localStorage.service";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const storedUser = localStorageService.getItem<{
      isAuthenticated: boolean;
      userId: string;
    }>("questbound");
    if (!storedUser?.isAuthenticated) {
      throw redirect({ to: "/login" });
    }

    context.authState.loginUser();
    context.userState.setUserId(storedUser.userId)

  },
  component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />;
}
