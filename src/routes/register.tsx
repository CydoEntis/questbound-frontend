import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../features/auth/components/AuthCard";
import AuthWrapper from "../features/auth/components/wrapper/AuthWrapper";
import RegisterForm from "../features/auth/register/RegisterForm";

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

type Props = {};
function RegisterPage({}: Props) {
	return (
		<AuthWrapper>
			<AuthCard
				title="Let's Get You Signed Up!"
				anchorLabel="Already Have An Account?"
				anchorText="Log In"
				to="/login"
			>
				<RegisterForm />
			</AuthCard>
		</AuthWrapper>
	);
}
