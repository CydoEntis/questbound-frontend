import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import ForgotPassword from "../../features/auth/components/forgot-password-form/ForgotPasswordForm";
import localStorageService from "../../api/services/localStorage.service";
import { Tokens } from "../../features/auth/shared/auth.types";

export const Route = createFileRoute("/_auth/forgot-password")({
  beforeLoad: ({ context }) => {
    const tokens = localStorageService.getItem<Tokens>("questbound");

    if (tokens) {
      // Redirect to homepage if the user is logged in
      throw redirect({ to: "/" });
    }

    return;
  },
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot Your Password?"
      anchorLabel="Remembered your password?"
      anchorText="Log in"
      to="/login"
    >
      <ForgotPassword />
    </AuthCard>
  );
}
