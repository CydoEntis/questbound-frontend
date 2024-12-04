import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { AxiosError } from "axios";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock, User2 } from "lucide-react";
import { UpdateAccountDetails } from "../shared/types";

// import classes from "../auth.module.css";

import { useState } from "react";
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
  const [error, setError] = useState("");

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
      console.log("request");
      console.log("SUBMIT");
      await updateUserDetails.mutateAsync(request);
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/";

      router.history.push(redirectTo);
      handleClose();
      form.reset();
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
    <form onSubmit={form.onSubmit(onSubmit)} id="updateAccountDetailsForm">
      <TextInput
        label="Username"
        placeholder="Your Username"
        classNames={
          {
            // input: classes.input,
          }
        }
        leftSection={<User2 size={20} />}
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={
          {
            // input: classes.input,
          }
        }
        leftSection={<AtSign size={20} />}
        {...form.getInputProps("email")}
      />
      {/* <Button
        fullWidth
        mt="xl"
        color="violet"
        variant="light"
        type="submit"
        // loading={changePassword.isPending}
      >
        Update Details
      </Button> */}
    </form>
  );
}

export default UpdateAccountDetailsForm;
