import { Popover, PasswordInput, Progress } from "@mantine/core";
import { ReactNode, useState } from "react";

import { Lock } from "lucide-react";
import PasswordRequirement from "./PasswordRequirement";
import {
  passwordRequirements,
  testPasswordStrength,
} from "../../shared/utils/utils";

type ValidatedPasswordInputProps = {
  required?: boolean;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: ReactNode;
  disabled?: boolean;
};

function ValidatedPasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: ValidatedPasswordInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [passwordValue, setPasswordValue] = useState(value);
  const checks = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passwordValue)}
    />
  ));

  const strength = testPasswordStrength(passwordValue);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <PasswordInput
          classNames={{
            input: "input",
          }}
          required
          label={label}
          placeholder={placeholder}
          mt="md"
          value={passwordValue}
          onChange={(event) => {
            setPasswordValue(event.currentTarget.value);
            onChange(event);
          }}
          error={error}
          radius="md"
          disabled={disabled}
          leftSection={<Lock size={20} />}
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}

export default ValidatedPasswordInput;
