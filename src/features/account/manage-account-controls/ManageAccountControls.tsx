import { ActionIcon, Group } from "@mantine/core";
import { Edit, Save, X } from "lucide-react";

type ManageAccountControlsProps = {
  isOpen: boolean;
  closeFormHandler: () => void;
  showFormHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ManageAccountControls({
  isOpen,
  closeFormHandler,
  showFormHandler,
}: ManageAccountControlsProps) {
  if (isOpen)
    return (
      <Group pos="absolute" top={5} right={5} gap={4}>
        <ActionIcon
          variant="light"
          color="violet"
          form="updateAccountDetailsForm"
          type="submit"
        >
          <Save size={20} />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="red"
          type="button"
          onClick={closeFormHandler}
        >
          <X size={20} />
        </ActionIcon>
      </Group>
    );

  return (
    <ActionIcon
      type="button"
      variant="light"
      color="violet"
      pos="absolute"
      top={5}
      right={5}
      onClick={showFormHandler}
    >
      <Edit size={20} />
    </ActionIcon>
  );
}

export default ManageAccountControls;
