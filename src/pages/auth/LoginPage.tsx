import { Box, Container } from "@mantine/core";
import AuthCard from "../../features/auth/components/AuthCard";
import LoginForm from "../../features/auth/login/LoginForm";

type Props = {};
// TODO: Make the Box/Container into a reusable Page wrapper for auth related components.
function LoginPage({}: Props) {
	return (
		<Box
			style={{
				display: "flex", 
				justifyContent: "center", 
				alignItems: "flex-start", 
				minHeight: "calc(100vh - 60px)", 
				height: "100%",
				position: "relative", 
			}}
		>
			<Container
				p={0}
				w="100%"
				maw={520}
				style={{
					position: "absolute",
					top: "20%", 
					left: "50%", 
					transform: "translateX(-50%)",
				}}
			>
				<AuthCard
					title="Welcome Back"
					anchorLabel="Don't have an account yet?"
					anchorText="Create Account"
					to="/register"
				>
					<LoginForm />
				</AuthCard>
			</Container>
		</Box>
	);
}

export default LoginPage;
