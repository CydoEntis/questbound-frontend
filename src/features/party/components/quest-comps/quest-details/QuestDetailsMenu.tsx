import { ActionIcon, Menu } from "@mantine/core";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";

type QuestDetailsMenu = {
  onEdit: () => void;
  onDelete: () => void;
};

function QuestDetailsMenu({ onEdit, onDelete }: QuestDetailsMenu) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="light" color="dimmed">
          <MoreVertical size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Edit2 size={20} />} onClick={onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item leftSection={<Trash2 size={20} />} onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default QuestDetailsMenu;
