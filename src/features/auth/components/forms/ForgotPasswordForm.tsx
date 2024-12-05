import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";

import { AxiosError } from "axios";
import { Button, TextInput } from "@mantine/core";
import { AtSign } from "lucide-react";

import { useForgotPassword } from "../../api/auth";
import { ForgotPasswordRequest } from "../../shared/auth.types";
import { forgotPasswordSchema } from "../../shared/auth.schemas";

type Props = {};

function ForgotPassword({}: Props) {
  const forgotPassword = useForgotPassword();
  const router = useRouter();

  const form = useForm<ForgotPasswordRequest>({
    validate: zodResolver(forgotPasswordSchema),
    initialValues: {
      email: "",
    },
  });

  async function onSubmit(email: ForgotPasswordRequest) {
    try {
      await forgotPassword.mutateAsync(email);
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/login";
      router.history.push(redirectTo);
      form.reset();
    } catch (error) {
      console.log("Login Error: ", error);
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.entries(errors).forEach(([field, messages]) => {
          form.setErrors({ [field]: (messages as string[]).join(" ") });
        });
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={{
          input: "input"
        }}
        leftSection={<AtSign size={20} />}
        {...form.getInputProps("email")}
      />
      <Button
        fullWidth
        mt="xl"
        color="violet"
        variant="light"
        type="submit"
        loading={forgotPassword.isPending}
      >
        Forgot Password
      </Button>
    </form>
  );
}

export default ForgotPassword;
