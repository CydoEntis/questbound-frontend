import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import localStorageService from "../api/services/localStorage.service";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const storedUser = localStorageService.getItem<{
      isAuthenticated: boolean;
      userId: string;
    }>("questbound");

    if (!storedUser?.isAuthenticated) {
      // Check if there's a redirect URL in the current location
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      
      // If there's a redirect URL, redirect to login with that URL
      if (currentPath !== "/login") {
        const redirectTo = encodeURIComponent(`${currentPath}${currentSearch}`);
        throw redirect({ to: `/login?redirect=${redirectTo}` });
      } else {
        // If already on the login page, just send them to the login without any redirect
        throw redirect({ to: `/login`, search: { redirect: undefined } });
      }
    }

    // If authenticated, set the user state
    context.authState.loginUser();
    context.userState.setUserId(storedUser.userId);
  },
  component: AuthenticatedRoutes,
});

function AuthenticatedRoutes() {
  return <Outlet />;
}
