import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../../features/auth/components/auth-card/AuthCard";
import RegisterForm from "../../features/auth/components/register-form/RegisterForm";

export const Route = createFileRoute("/_auth/register")({
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
