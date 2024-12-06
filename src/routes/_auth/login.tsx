import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import LoginForm from "../../features/auth/components/login-form/LoginForm";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      anchorLabel="Don't have an account yet?"
      anchorText="Create Account"
      to="/register"
    >
      <LoginForm />
    </AuthCard>
  );
}
