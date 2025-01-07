import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import ResetPassword from "../../features/auth/components/reset-password-form/ResetPasswordForm";
import useAuthStore from "../../stores/useAuthStore";

export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const isAuthenticated = useAuthStore((state) => state.checkIsAuthenticated());
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  return (
    <AuthCard
      title="Reset Your Password"
      anchorLabel="No longer need to reset your password?"
      anchorText="Log in"
      to="/login"
    >
      <ResetPassword />
    </AuthCard>
  );
}
