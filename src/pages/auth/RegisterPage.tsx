import { Box, Container } from "@mantine/core";
import AuthCard from "../../features/auth/AuthCard";
import RegisterForm from "../../features/auth/RegisterForm";

type Props = {};

function Register({}: Props) {
	return (
		<Box>
			<Container
				w="100%"
				maw={520}
			>
				<AuthCard
					title="Let's Get You Signed Up!"
					anchorLabel="Already Have An Account?"
					anchorText="Log In"
					to="/login"
				>
					<RegisterForm />
				</AuthCard>
			</Container>
		</Box>
	);
}

export default Register;
