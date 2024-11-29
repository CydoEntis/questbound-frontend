import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "../features/auth/components/AuthCard";
import AuthWrapper from "../features/auth/components/wrapper/AuthWrapper";
import LoginForm from "../features/auth/login/LoginForm";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	return (
		<AuthWrapper>
			<AuthCard
				title="Welcome Back"
				anchorLabel="Don't have an account yet?"
				anchorText="Create Account"
				to="/register"
			>
				<LoginForm />
			</AuthCard>
		</AuthWrapper>
	);
}
