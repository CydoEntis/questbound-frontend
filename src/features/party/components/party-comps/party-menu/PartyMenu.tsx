import { ActionIcon, Menu } from "@mantine/core";
import { Edit2, Settings, Trash2 } from "lucide-react";

type PartyMenu = {
  onEdit: () => void;
  onDelete: () => void;
};

function PartyMenu({ onEdit, onDelete }: PartyMenu) {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="light" color="dimmed">
          <Settings size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Edit2 size={16} />} onClick={onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item leftSection={<Trash2 size={16} />} onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default PartyMenu;
