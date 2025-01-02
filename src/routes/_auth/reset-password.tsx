import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import ResetPassword from "../../features/auth/components/reset-password-form/ResetPasswordForm";


export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
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
