import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import ForgotPassword from "../../features/auth/components/forgot-password-form/ForgotPasswordForm";
import { useDocumentTitle } from "@mantine/hooks";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
    useDocumentTitle("Questbound | Forgot Password");
  
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
