import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { TextInput } from "@mantine/core";
import { AtSign, User2 } from "lucide-react";
import { UpdateAccountDetails } from "../shared/types";

// import classes from "../auth.module.css";

import { updateAccountDetailsSchema } from "../shared/schema";
import { UserResponse } from "../../auth/shared/types";
import { useUpdateUserDetails } from "../api/user";

type UpdateAccountDetailsFormProps = {
  user: UserResponse;
  handleClose: () => void;
};

function UpdateAccountDetailsForm({
  user,
  handleClose,
}: UpdateAccountDetailsFormProps) {
  const updateUserDetails = useUpdateUserDetails();
  const router = useRouter();

  const form = useForm<UpdateAccountDetails>({
    validate: zodResolver(updateAccountDetailsSchema),
    initialValues: {
      email: user.email,
      username: user.username,
    },
  });

  console.log(form.errors);
  async function onSubmit(request: UpdateAccountDetails) {
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
    <form onSubmit={form.onSubmit(onSubmit)} id="updateAccountDetailsForm">
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

export default UpdateAccountDetailsForm;
