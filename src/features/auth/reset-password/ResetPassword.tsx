import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign } from "lucide-react";

import classes from "../auth.module.css";
import { useChangePassword } from "../api/auth";
import { ChangePasswordRequest } from "../shared/types";
import { changePasswordSchema } from "../shared/schema";
import ValidatedPasswordInput from "../components/inputs/ValidatedPasswordInput";

type Props = {};

function ResetPassword({}: Props) {
	const resetPassword = useChangePassword();
	const router = useRouter();

	const form = useForm<ChangePasswordRequest>({
		validate: zodResolver(changePasswordSchema),
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	async function onSubmit(request: ChangePasswordRequest) {
		try {
			await resetPassword.mutateAsync(request);
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
			<PasswordInput
				label="Old Password"
				placeholder="Your current password"
				mt="md"
				classNames={{
					input: classes.input,
				}}
				{...form.getInputProps("oldPassword")}
				onChange={(event) => {
					form.setFieldValue("oldPassword", event.currentTarget.value);
				}}
			/>
			<ValidatedPasswordInput
				required
				label="New Password"
				placeholder="Your new password"
				value={form.values.newPassword}
				onChange={(event) =>
					form.setFieldValue("newPassword", event.currentTarget.value)
				}
				error={form.errors.password}
			/>
			<PasswordInput
				label="Confirm New Password"
				placeholder="Confirm your new password"
				mt="md"
				classNames={{
					input: classes.input,
				}}
				{...form.getInputProps("confirmNewPassword")}
				onChange={(event) => {
					form.setFieldValue("confirmNewPassword", event.currentTarget.value);
				}}
			/>
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				Reset Password
			</Button>
		</form>
	);
}

export default ResetPassword;
