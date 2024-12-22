import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { TextInput } from "@mantine/core";
import { AtSign, User2 } from "lucide-react";
import { UpdateAccount, User } from "../../shared/account.types";
import { useUpdateUserDetails } from "../../api/account";
import { updateAccountSchema } from "../../shared/account.schemas";

type UpdateAccountFormProps = {
  user: User;
  handleClose: () => void;
};

function UpdateAccountForm({ user, handleClose }: UpdateAccountFormProps) {
  const updateUserDetails = useUpdateUserDetails();
  const router = useRouter();

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
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/";

      router.history.push(redirectTo);
      handleClose();
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.entries(errors).forEach(([field, messages]) => {
          form.setErrors({ [field]: (messages as string[]).join(" ") });
        });
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)} id="updateAccountForm">
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
