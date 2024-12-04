import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Alert, Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";

import classes from "../auth.module.css";
import { useChangePassword } from "../api/auth";
import { ChangePasswordRequest, ResetPasswordRequest } from "../shared/types";
import { changePasswordSchema, resetPasswordSchema } from "../shared/schema";
import ValidatedPasswordInput from "../components/inputs/ValidatedPasswordInput";
import { useState } from "react";
import { transformErrorsToCamelCase } from "../../../shared/utils/password.utils";
import { CamelCasedErrors, Errors } from "../../../shared/types/types";

type ChangePasswordProps = {
  handleClose: () => void;
};

function ChangePassword({ handleClose }: ChangePasswordProps) {
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

  const handleCancel = () => {
    handleClose();
    form.reset();
  };

  async function onSubmit(request: ChangePasswordRequest) {
    console.log("IS THIS WORKING??");
    try {
      await changePassword.mutateAsync(request);

      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/";

      router.history.push(redirectTo);
      handleClose();
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors: Errors = error.response.data.errors;
        const transformedErrors: CamelCasedErrors =
          transformErrorsToCamelCase(errors);
        console.log("Transformed: ", transformErrorsToCamelCase);
        form.setErrors(transformedErrors);
      }
      console.log(error);
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
      <Flex gap={8}>
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
        <Button
          fullWidth
          mt="xl"
          color="red"
          variant="light"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Flex>
    </form>
  );
}

export default ChangePassword;
