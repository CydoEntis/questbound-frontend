import { createFileRoute, Outlet } from "@tanstack/react-router";
import AuthWrapper from "../features/auth/components/wrapper/AuthWrapper";

export const Route = createFileRoute("/_auth")({
  component: AuthRoutes,
});

function AuthRoutes() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
