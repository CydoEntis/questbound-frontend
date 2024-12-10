import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthWrapper from "../features/auth/components/auth-wrapper/AuthWrapper";
import localStorageService from "../api/services/localStorage.service";
import accountService from "../features/account/api/account.service";

// Define the _auth route
export const Route = createFileRoute("/_auth")({
  // beforeLoad: async ({ context }) => {
  //   const isAuthenticated = localStorageService.getItem<{isAuthenticated: boolean}>("questbound");

  //   if (isAuthenticated) {
  //     context.authState.loginUser();
  //     try {
  //       const user = await context.queryClient.fetchQuery({
  //         queryKey: ["user"],
  //         queryFn: accountService.getUserDetails,
  //       });

  //       context.userState.setUser(user);
        
  //       throw redirect({ to: "/" });
  //     } catch (error) {
  //     }
  //   }

  //   return; 
  // },
  component: AuthRoutes, 
});

function AuthRoutes() {

  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
