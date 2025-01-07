import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import LoginForm from "../../features/auth/components/login-form/LoginForm";
import { useDocumentTitle } from "@mantine/hooks";
import useAuthStore from "../../stores/useAuthStore";

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
  useDocumentTitle("Questbound | Login");

  const navigate = useNavigate();
  const searchParams = useSearch({
    from: "/_auth/login",
  });

  const redirectTo = searchParams.redirect ?? null;
  const registerUrl = redirectTo
    ? `/register?redirect=${encodeURIComponent(redirectTo)}`
    : "/register";

  const isAuthenticated = useAuthStore((state) => state.checkIsAuthenticated());

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  return (
    <AuthCard
      title="Welcome Back"
      anchorLabel="Don't have an account yet?"
      anchorText="Create Account"
      to={registerUrl}
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
