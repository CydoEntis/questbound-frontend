import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/cards/AuthCard";
import ResetPassword from "../../features/auth/components/forms/ResetPasswordForm";

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
