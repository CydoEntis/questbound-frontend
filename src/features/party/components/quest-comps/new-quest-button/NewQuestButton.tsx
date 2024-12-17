import { Button } from "@mantine/core";
import { Plus } from "lucide-react";

type NewQuestButtonProps = {
  onOpen: () => void;
};

function NewQuestButton({ onOpen }: NewQuestButtonProps) {
  return (
    <Button
      leftSection={<Plus size={20} />}
      variant="light"
      color="violet"
      onClick={onOpen}
    >
      New Quest
    </Button>
  );
}

export default NewQuestButton;
