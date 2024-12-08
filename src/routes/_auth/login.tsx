import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import LoginForm from "../../features/auth/components/login-form/LoginForm";
import localStorageService from "../../api/services/localStorage.service";
import { Tokens } from "../../features/auth/shared/auth.types";

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: () => {
    const tokens = localStorageService.getItem<Tokens>("questbound");
    if (tokens) {
      // Redirect to homepage if the user is logged in
      throw redirect({ to: "/" });
    }

    return;
  },
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
