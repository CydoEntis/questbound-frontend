import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthWrapper from "../features/auth/components/auth-wrapper/AuthWrapper";
import localStorageService from "../api/services/localStorage.service";
import { Tokens } from "../features/auth/shared/auth.types";
import accountService from "../features/account/api/account.service";
import useAuthStore from "../stores/useAuthStore";

// Define the _auth route
export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = localStorageService.getItem<{isAuthenticated: boolean}>("questbound");

    if (isAuthenticated) {
      context.authState.loginUser();
      try {
        const user = await context.queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: accountService.getUserDetails,
        });

        context.authState.setUser(user);
        
        throw redirect({ to: "/" });
      } catch (error) {
      }
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
