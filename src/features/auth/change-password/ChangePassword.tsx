import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import classes from "../auth.module.css";
import { useChangePassword } from "../api/auth";
import { ChangePasswordRequest, ResetPasswordRequest } from "../shared/types";
import { changePasswordSchema, resetPasswordSchema } from "../shared/schema";
import ValidatedPasswordInput from "../components/inputs/ValidatedPasswordInput";
import { useState } from "react";

type Props = {};

function ChangePassword({}: Props) {
  const changePassword = useChangePassword();
  const router = useRouter();
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

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
      if (token) {
        await changePassword.mutateAsync(request);

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
      <PasswordInput
        label="Old Password"
        placeholder="Your old password"
        mt="md"
        classNames={{
          input: classes.input,
        }}
        {...form.getInputProps("oldPassword")}
        leftSection={<Lock size={20} />}
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
        leftSection={<Lock size={20} />}
      />
      <Button
        fullWidth
        mt="xl"
        color="violet"
        variant="light"
        type="submit"
        loading={changePassword.isPending}
      >
        Change Password
      </Button>
    </form>
  );
}

export default ChangePassword;
