import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import ResetPassword from "../../features/auth/components/reset-password-form/ResetPasswordForm";
import localStorageService from "../../api/services/localStorage.service";
import { Tokens } from "../../features/auth/shared/auth.types";

export const Route = createFileRoute("/_auth/reset-password")({
  beforeLoad: () => {
    const tokens = localStorageService.getItem<Tokens>("questbound");
    if (tokens) {
      throw redirect({ to: "/" });
    }

    return;
  },
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
