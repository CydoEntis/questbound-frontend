import { createFileRoute, Outlet } from "@tanstack/react-router";
import AuthWrapper from "../features/auth/components/auth-wrapper/AuthWrapper";
import localStorageService from "../api/services/localStorage.service";

// Define the _auth route
export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = localStorageService.getItem<{
      isAuthenticated: boolean;
    }>("questbound");

    if (isAuthenticated) {
      context.authState.loginUser();
    }

    return;
  },
  component: AuthRoutes,
});

function AuthRoutes() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
