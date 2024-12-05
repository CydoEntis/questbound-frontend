import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Button, Flex, PasswordInput } from "@mantine/core";
import { Lock } from "lucide-react";
import { useChangePassword } from "../../api/account";
import { ChangePasswordRequest } from "../../shared/account.types";
import { changePasswordSchema } from "../../shared/account.schemas";
import { CamelCasedErrors, Errors } from "../../../../shared/types/types";
import { transformErrorsToCamelCase } from "../../../../shared/utils/password.utils";
import ValidatedPasswordInput from "../../../auth/components/password/ValidatedPasswordInput";



type ChangePasswordFormProps = {
  handleClose: () => void;
};

function ChangePasswordForm({ handleClose }: ChangePasswordFormProps) {
  const changePassword = useChangePassword();
  const router = useRouter();

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
