import { Anchor, Box, Container, Paper, Text, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import React from "react";
import AuthCard from "../../features/auth/AuthCard";
import LoginForm from "../../features/auth/LoginForm";

type Props = {};

function LoginPage({}: Props) {
	return (
		<Box p={0}>
			<Container
				p={0}
				w="100%"
				maw={520}
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
