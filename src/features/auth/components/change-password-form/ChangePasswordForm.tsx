import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, Flex, PasswordInput } from "@mantine/core";
import { Lock } from "lucide-react";

import ValidatedPasswordInput from "../validated-password-input/ValidatedPasswordInput";
import { useChangePassword } from "../../api/auth";
import { changePasswordSchema } from "../../shared/auth.schemas";
import { ChangePasswordRequest } from "../../shared/auth.types";
import useFormErrorHandler from "../../../../shared/hooks/useHandleErrors";
import { ErrorResponse } from "../../../../api/errors/error.types";

type ChangePasswordFormProps = {
  handleClose: () => void;
};

function ChangePasswordForm({ handleClose }: ChangePasswordFormProps) {
  const changePassword = useChangePassword();
  const router = useRouter();
  const { handleAuthFormErrors } = useFormErrorHandler<ChangePasswordRequest>();
  const form = useForm<ChangePasswordRequest>({
    validate: zodResolver(changePasswordSchema),
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleCancel = () => {
    handleClose();
    form.reset();
  };

  async function onSubmit(request: ChangePasswordRequest) {
    try {
      await changePassword.mutateAsync(request);

      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/";

      router.history.push(redirectTo);
      handleClose();
      form.reset();
    } catch (err) {
      const error = err as ErrorResponse;
      handleAuthFormErrors(error, form);
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <PasswordInput
        label="Current Password"
        placeholder="Your current password"
        mt="md"
        classNames={{
          input: "input",
        }}
        {...form.getInputProps("currentPassword")}
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
          input: "input",
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

export default ChangePasswordForm;
