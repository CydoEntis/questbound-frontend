import { useForm } from "@mantine/form";
import { Link, useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { forgotPasswordSchema } from "../shared/schema";
import { ForgotPasswordRequest } from "../shared/types";
import { AxiosError } from "axios";
import { Button, TextInput } from "@mantine/core";
import { AtSign } from "lucide-react";

import classes from "../auth.module.css";
import { useForgotPassword } from "../api/auth";

type Props = {};

function ForgotPassword({}: Props) {
	const forgotPassword = useForgotPassword();
	const router = useRouter();

	const form = useForm<ForgotPasswordRequest>({
		validate: zodResolver(forgotPasswordSchema),
		initialValues: {
			email: "",
		},
	});

	async function onSubmit(email: ForgotPasswordRequest) {
		try {
			await forgotPassword.mutateAsync(email);
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
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				Forgot Password
			</Button>
		</form>
	);
}

export default ForgotPassword;
