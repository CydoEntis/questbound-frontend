import {
  Avatar,
  Button,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Text,
  Paper,
} from "@mantine/core";
import { AtSign, Lock, User2, Check } from "lucide-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { useState } from "react";
import MaleA from "../../../../assets/male_a.png";
import MaleB from "../../../../assets/male_b.png";
import FemaleA from "../../../../assets/female_a.png";
import FemaleB from "../../../../assets/female_b.png";
import { useNavigate } from "@tanstack/react-router";

import { CamelCasedErrors, Errors } from "../../../../shared/types/types";
import { transformErrorsToCamelCase } from "../../../../shared/utils/password.utils";
import { useRegister } from "../../api/auth";
import { RegisterRequest } from "../../shared/auth.types";
import { registerSchema } from "../../shared/auth.schemas";
import ValidatedPasswordInput from "../validated-password-input/ValidatedPasswordInput";

function RegisterForm() {
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const register = useRegister();
  const navigate = useNavigate();
  const startAvatars = [
    { id: 1, src: MaleA, name: "Male A" },
    { id: 2, src: MaleB, name: "Male B" },
    { id: 3, src: FemaleA, name: "Female A" },
    { id: 4, src: FemaleB, name: "Female B" },
  ];

  const form = useForm<RegisterRequest>({
    validate: zodResolver(registerSchema),
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterRequest) {
    try {
      const newUser = {
        ...data,
        avatarId: selectedAvatar,
      };

      await register.mutateAsync(newUser);
      form.reset();
      navigate({ to: "/" });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        const errors: Errors = error.response.data.errors;
        const transformedErrors: CamelCasedErrors =
          transformErrorsToCamelCase(errors);
        form.setErrors(transformedErrors);
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          classNames={{
            input: "input",
          }}
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Display Name"
          placeholder="TaskSlayer1337"
          classNames={{
            input: "input",
          }}
          leftSection={<User2 size={20} />}
          {...form.getInputProps("username")}
        />
        <Text size="sm">Select Your Avatar</Text>
        <SimpleGrid cols={4}>
          {startAvatars.map((avatar) => (
            <Stack
              justify="center"
              align="center"
              gap={2}
              key={avatar.id}
              style={{ position: "relative" }}
              onClick={() => setSelectedAvatar(avatar.id)}
            >
              <Avatar
                bg="violet"
                src={avatar.src}
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
              />
              {selectedAvatar === avatar.id && (
                <Paper
                  withBorder
                  pos="absolute"
                  bg="violet"
                  c="white"
                  radius="100%"
                  p={2}
                  style={{
                    bottom: 15,
                    right: 20,
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={20} />{" "}
                </Paper>
              )}
              <Text size="xs" ta="center">
                {avatar.name}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
      <ValidatedPasswordInput
        required
        label="Password"
        placeholder="Your password"
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue("password", event.currentTarget.value)
        }
        error={form.errors.password}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        mt="md"
        classNames={{
          input: "input",
        }}
        leftSection={<Lock size={20} />}
        {...form.getInputProps("confirmPassword")}
        onChange={(event) => {
          form.setFieldValue("confirmPassword", event.currentTarget.value);
        }}
      />

      <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
        Sign up
      </Button>
    </form>
  );
}

export default RegisterForm;
