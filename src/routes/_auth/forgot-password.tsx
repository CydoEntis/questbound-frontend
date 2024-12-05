import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/cards/AuthCard";
import ForgotPassword from "../../features/auth/components/forms/ForgotPasswordForm";

export const Route = createFileRoute("/_auth/forgot-password")({
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
