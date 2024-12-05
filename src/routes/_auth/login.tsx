import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/cards/AuthCard";
import LoginForm from "../../features/auth/components/forms/LoginForm";

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
