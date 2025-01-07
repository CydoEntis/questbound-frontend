import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import RegisterForm from "../../features/auth/components/register-form/RegisterForm";
import { useDocumentTitle } from "@mantine/hooks";
import useAuthStore from "../../stores/useAuthStore";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
  validateSearch: (
    params: Record<string, string | number>
  ): { redirect: string | undefined } => {
    return {
      redirect: params.redirect as string | undefined,
    };
  },
});

function RegisterPage() {
  useDocumentTitle("Questbound | Register");

  const navigate = useNavigate();
  const searchParams = useSearch({
    from: "/_auth/register",
  });

  const redirectTo = searchParams.redirect ?? null;
  const loginUrl = redirectTo
    ? `/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/login";

  const isAuthenticated = useAuthStore((state) => state.checkIsAuthenticated());

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  return (
    <AuthCard
      title="Let's Get You Signed Up!"
      anchorLabel="Already Have An Account?"
      anchorText="Log In"
      to={loginUrl}
    >
      <RegisterForm redirectTo={redirectTo} />
    </AuthCard>
  );
}
