import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import classes from "../auth.module.css";
import { useResetPassword } from "../api/auth";
import { ResetPasswordRequest } from "../shared/types";
import { resetPasswordSchema } from "../shared/schema";
import ValidatedPasswordInput from "../components/inputs/ValidatedPasswordInput";

type Props = {};

function ResetPassword({}: Props) {
  const resetPassword = useResetPassword();
  const router = useRouter();

  // Extract the token from the URL query string
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

//   if (!token) {
//     router.history.push("/error");
//     return null;
//   }


  const form = useForm<ResetPasswordRequest>({
    validate: zodResolver(resetPasswordSchema),
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
      token, // Add token to form data
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
      }
    }
  }

  console.log(form.errors);

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
        leftSection={<Lock size={20} />}
      />
      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        Reset Password
      </Button>
    </form>
  );
}

export default ResetPassword;
