import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "../../../../stores/useAuthStore";
import SidebarNavAuth from "./SidebarNavAuth";
import { Container, Group, Modal, Image, Text } from "@mantine/core";
import Gold from "../../../../assets/gold.png";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const { user } = useAuthStore();

  const [avatarShopOpen, { open: openAvatarShop, close: closeAvatarShop }] =
    useDisclosure(false);

  return (
    <>
      <Modal opened={avatarShopOpen} onClose={closeAvatarShop} title="Avatar Shop">
        <Container fluid>
          <Text>Your balance</Text>
          <Group gap={4}>
            <Text>{user?.gold}</Text>
            <Image src={Gold} w={20} />
          </Group>
        </Container>
      </Modal>
      <SidebarNavAuth
        user={user!}
        closeNav={onClose}
        onOpenAvatarShop={openAvatarShop}
      />
    </>
  );
}

export default Sidebar;
