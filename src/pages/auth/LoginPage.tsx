import AuthCard from "../../features/auth/components/AuthCard";
import LoginForm from "../../features/auth/login/LoginForm";
import AuthWrapper from "../../features/auth/components/wrapper/AuthWrapper";

type Props = {};
function LoginPage({}: Props) {
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

export default LoginPage;
