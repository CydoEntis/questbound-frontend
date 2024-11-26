import { Anchor, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import classes from "./auth.module.css";

const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginFormSchema>;

type Props = {};

function LoginForm({}: Props) {
	// const { login: loginUser } = useUserStore();
	const navigate = useNavigate();
	const location = useLocation();

	const from = (location.state as { from?: string })?.from || "/";

	const form = useForm<LoginFormData>({
		validate: zodResolver(loginFormSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormData) {
		try {
			// await loginUser(data);

			form.reset();
			navigate({ to: from });
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.errors) {
				if (error.response.data.errors.badRequest) {
					const errorMessage = error.response.data.errors.badRequest[0];
					form.setErrors({ email: errorMessage });
				}
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
