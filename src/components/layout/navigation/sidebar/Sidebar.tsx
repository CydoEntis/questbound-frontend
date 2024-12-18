import { useDisclosure } from "@mantine/hooks";
import SidebarNavAuth from "./SidebarNavAuth";
import AvatarShop from "../../../../features/avatar/components/avatar-shop/AvatarShop";
import { useGetUser } from "../../../../features/account/api/account";
import PartyDrawer from "../../../../features/party/components/party-comps/party-drawer/PartyDrawer";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  // Type the user data retrieved from the cache
  const { data: user } = useGetUser();

  const [avatarShopOpen, { open: openAvatarShop, close: closeAvatarShop }] =
    useDisclosure(false);

  const [
    createPartyOpened,
    { open: openCreateParty, close: closeCreateParty },
  ] = useDisclosure(false);

  // Handle missing user data
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PartyDrawer
        isOpened={createPartyOpened}
        onClose={closeCreateParty}
        drawerMode={"create"}
      />
      <AvatarShop
        avatarShopOpen={avatarShopOpen}
        closeAvatarShop={closeAvatarShop}
        user={user} // Ensure this matches AvatarShop's props
      />
      <SidebarNavAuth
        user={user} // Ensure this matches SidebarNavAuth's props
        closeNav={onClose}
        onOpenAvatarShop={openAvatarShop}
        onOpenCreateParty={openCreateParty}
      />
    </>
  );
}

export default Sidebar;
