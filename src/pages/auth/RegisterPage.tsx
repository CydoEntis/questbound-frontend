import AuthCard from "../../features/auth/components/AuthCard";
import RegisterForm from "../../features/auth/register/RegisterForm";
import AuthWrapper from "../../features/auth/components/wrapper/AuthWrapper";

type Props = {};
function Register({}: Props) {
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

export default Register;
