import { Anchor, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { Link, useRouter } from "@tanstack/react-router";

import classes from "../auth.module.css";
import { LoginRequest } from "../shared/types";
import { useLogin } from "../api/auth";
import { loginSchema } from "../shared/schema";

type Props = {};

function LoginForm({}: Props) {
	const login = useLogin();
	const router = useRouter();

	const form = useForm<LoginRequest>({
		validate: zodResolver(loginSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(credentials: LoginRequest) {
		try {
			await login.mutateAsync(credentials);
			const searchParams = new URLSearchParams(window.location.search);
			const redirectTo = searchParams.get("redirect") || "/";
			router.history.push(redirectTo);
			form.reset();
		} catch (error) {
			console.log("Login Error: ", error);
			if (error instanceof AxiosError && error.response?.data?.errors) {
				const errors = error.response.data.errors;
				Object.entries(errors).forEach(([field, messages]) => {
					form.setErrors({ [field]: (messages as string[]).join(" ") });
				});
			}
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				label="Email"
				placeholder="you@example.com"
				classNames={{
					input: classes.input,
				}}
				leftSection={<AtSign size={20} />}
				{...form.getInputProps("email")}
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				withAsterisk
				required
				mt="md"
				classNames={{
					input: classes.input,
				}}
				leftSection={<Lock size={20} />}
				{...form.getInputProps("password")}
				onChange={(event) => {
					form.setFieldValue("password", event.currentTarget.value);
				}}
			/>
			<Group
				justify="end"
				mt="lg"
			>
				<Anchor
					component={Link}
					size="sm"
					c="violet"
					to={"/forgot-password"}
				>
					Forgot password?
				</Anchor>
			</Group>
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				Sign in
			</Button>
		</form>
	);
}

export default LoginForm;
