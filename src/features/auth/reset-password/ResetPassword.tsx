import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import classes from "../auth.module.css";
import { useResetPassword } from "../api/auth";
import { ResetPasswordRequest } from "../shared/types";
import { resetPasswordSchema } from "../shared/schema";
import ValidatedPasswordInput from "../components/inputs/ValidatedPasswordInput";
import { useState } from "react";

type Props = {};

function ResetPassword({}: Props) {
  const resetPassword = useResetPassword();
  const router = useRouter();
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordRequest>({
    validate: zodResolver(resetPasswordSchema),
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
      token
    },
  });

  async function onSubmit(request: ResetPasswordRequest) {
    try {
      if (token) {
        // URL encode the token before sending it to the server
        const encodedToken = encodeURIComponent(token);

        await resetPassword.mutateAsync({
          ...request,
          token: encodedToken, // Send the encoded token
        });

        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get("redirect") || "/";

        router.history.push(redirectTo);
        form.reset();
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.entries(errors).forEach(([field, messages]) => {
          form.setErrors({ [field]: (messages as string[]).join(" ") });
        });

        if (errors["token"]) {
          setError(errors["token"]);
        }
      }
    }
  }

  console.log(form.errors);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {error && (
        <Alert my={16} variant="light" color="red" title="Error resetting password">
          {error}
        </Alert>
      )}
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={{
          input: classes.input,
        }}
        leftSection={<AtSign size={20} />}
        {...form.getInputProps("email")}
      />
      <ValidatedPasswordInput
        required
        label="New Password"
        placeholder="Your new password"
        value={form.values.newPassword}
        onChange={(event) =>
          form.setFieldValue("newPassword", event.currentTarget.value)
        }
        error={form.errors.newPassword}
      />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm your new password"
        mt="md"
        classNames={{
          input: classes.input,
        }}
		{...form.getInputProps("confirmNewPassword")}
		// value={form.values.confirmNewPassword}
        // onChange={(event) => {
        //   form.setFieldValue("confirmNewPassword", event.currentTarget.value);
        // }}
        leftSection={<Lock size={20} />}
		
      />
      <Button
        fullWidth
        mt="xl"
        color="violet"
        variant="light"
        type="submit"
        loading={resetPassword.isPending}
      >
        Reset Password
      </Button>
    </form>
  );
}

export default ResetPassword;
