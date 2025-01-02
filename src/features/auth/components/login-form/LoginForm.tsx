import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Alert,
} from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { Link, useRouter } from "@tanstack/react-router";

import { useLogin } from "../../api/auth";
import { LoginRequest } from "../../shared/auth.types";
import { loginSchema } from "../../shared/auth.schemas";
import { ErrorResponse } from "../../../../api/errors/error.types";
import useFormErrorHandler from "../../../../shared/hooks/useHandleErrors";

function LoginForm() {
  const login = useLogin();
  const router = useRouter();
  const { error, handleAuthFormErrors, resetError } =
    useFormErrorHandler<LoginRequest>();
  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(credentials: LoginRequest) {
    try {
      console.log("Credentials: ", credentials);
      await login.mutateAsync(credentials);
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/";
      router.history.push(redirectTo);
      form.reset();
    } catch (err) {
      const error = err as ErrorResponse;
      handleAuthFormErrors(error, form);
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {error ? (
        <Alert
          color="red"
          variant="light"
          title="Unexpected Error"
          ta="center"
          my={8}
        >
          {error}
        </Alert>
      ) : null}
      <TextInput
        label="Email"
        placeholder="you@example.com"
        classNames={{
          input: "input",
        }}
        leftSection={<AtSign size={20} />}
        {...form.getInputProps("email")}
        onChange={(event) => {
          const lowerCaseEmail = event.currentTarget.value.toLowerCase();
          form.setFieldValue("email", lowerCaseEmail);
          resetError();
        }}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        withAsterisk
        required
        mt="md"
        classNames={{
          input: "input",
        }}
        leftSection={<Lock size={20} />}
        {...form.getInputProps("password")}
        onChange={(event) => {
          form.setFieldValue("password", event.currentTarget.value);
          resetError();
        }}
      />
      <Group justify="end" mt="lg">
        <Anchor component={Link} size="sm" c="violet" to={"/forgot-password"}>
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
