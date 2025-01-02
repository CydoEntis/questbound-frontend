import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { LoadingOverlay, TextInput } from "@mantine/core";
import { AtSign, User2 } from "lucide-react";
import { UpdateAccount, User } from "../../shared/account.types";
import { useUpdateUserDetails } from "../../api/account";
import { updateAccountSchema } from "../../shared/account.schemas";
import { ErrorResponse } from "../../../../api/errors/error.types";
import useFormErrorHandler from "../../../../shared/hooks/useHandleErrors";

type UpdateAccountFormProps = {
  user: User;
  handleClose: () => void;
};

function UpdateAccountForm({ user, handleClose }: UpdateAccountFormProps) {
  const updateUserDetails = useUpdateUserDetails();
  const { handleFormErrors } = useFormErrorHandler<UpdateAccount>();

  const form = useForm<UpdateAccount>({
    validate: zodResolver(updateAccountSchema),
    initialValues: {
      email: user.email,
      username: user.username,
    },
  });

  async function onSubmit(request: UpdateAccount) {
    try {
      await updateUserDetails.mutateAsync(request);
      handleClose();
      form.reset();
    } catch (err) {
      const error = err as ErrorResponse;
      handleFormErrors(error, form);
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)} id="updateAccountForm">
      <LoadingOverlay visible={updateUserDetails.isPending} />
      <TextInput
        label="Username"
        placeholder="Your Username"
        classNames={{
          input: "input",
        }}
        leftSection={<User2 size={20} />}
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={{
          input: "input",
        }}
        leftSection={<AtSign size={20} />}
        {...form.getInputProps("email")}
      />
    </form>
  );
}

export default UpdateAccountForm;
