import { createFileRoute, useSearch } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import RegisterForm from "../../features/auth/components/register-form/RegisterForm";

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
  const useSearchParams = useSearch({
    from: "/_auth/register",
  });

  console.log(useSearchParams);

  const redirectTo = useSearchParams.redirect ?? null;

  console.log("Redirect to: ", redirectTo);

  const loginUrl = redirectTo
    ? `/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/login";

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
