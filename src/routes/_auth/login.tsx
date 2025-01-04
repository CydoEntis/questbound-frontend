import { createFileRoute, useSearch } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import LoginForm from "../../features/auth/components/login-form/LoginForm";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
  validateSearch: (
    params: Record<string, string | number>
  ): { redirect: string | undefined } => {
    return {
      redirect: params.redirect as string | undefined,
    };
  },
});

function LoginPage() {
  const searchParams = useSearch({
    from: "/_auth/login",
  });

  const redirectTo = searchParams.redirect ?? null;

  const registerUrl = redirectTo
    ? `/register?redirect=${encodeURIComponent(redirectTo)}`
    : "/register";

  return (
    <AuthCard
      title="Welcome Back"
      anchorLabel="Don't have an account yet?"
      anchorText="Create Account"
      to={registerUrl} // Pass the register URL with redirect parameter
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
