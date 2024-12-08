import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import RegisterForm from "../../features/auth/components/register-form/RegisterForm";
import localStorageService from "../../api/services/localStorage.service";
import { Tokens } from "../../features/auth/shared/auth.types";

export const Route = createFileRoute("/_auth/register")({
  beforeLoad: () => {
    const tokens = localStorageService.getItem<Tokens>("questbound");
    if (tokens) {
      throw redirect({ to: "/" });
    }

    return;
  },
  component: RegisterPage,
});

type Props = {};
function RegisterPage({}: Props) {
  return (
    <AuthCard
      title="Let's Get You Signed Up!"
      anchorLabel="Already Have An Account?"
      anchorText="Log In"
      to="/login"
    >
      <RegisterForm />
    </AuthCard>
  );
}
