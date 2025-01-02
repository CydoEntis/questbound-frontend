import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import { useResetPassword } from "../../api/auth";
import { ResetPasswordRequest } from "../../shared/auth.types";
import { resetPasswordSchema } from "../../shared/auth.schemas";
import ValidatedPasswordInput from "../validated-password-input/ValidatedPasswordInput";
import { ErrorResponse } from "../../../../api/errors/error.types";
import useFormErrorHandler from "../../../../shared/hooks/useHandleErrors";

function ResetPassword() {
  const resetPassword = useResetPassword();
  const router = useRouter();
  const { error, handleAuthFormErrors } =
    useFormErrorHandler<ResetPasswordRequest>();

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordRequest>({
    validate: zodResolver(resetPasswordSchema),
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
      token,
    },
  });

  async function onSubmit(request: ResetPasswordRequest) {
    try {
      if (token) {
        const encodedToken = encodeURIComponent(token);

        await resetPassword.mutateAsync({
          ...request,
          token: encodedToken,
        });

        const redirectTo = searchParams.get("redirect") || "/";
        router.history.push(redirectTo);
        form.reset();
      }
    } catch (e) {
      const error = e as ErrorResponse;
      handleAuthFormErrors(error, form);
    }
  }

  console.log(form.errors);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {error && (
        <Alert
          my={16}
          variant="light"
          color="red"
          title="Error resetting password"
        >
          {error}
        </Alert>
      )}
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={{
          input: "input",
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
          input: "input",
        }}
        {...form.getInputProps("confirmNewPassword")}
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
