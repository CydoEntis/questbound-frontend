import { useDisclosure } from "@mantine/hooks";
import SidebarNavAuth from "./SidebarNavAuth";
import AvatarShop from "../../../../features/avatar/components/avatar-shop/AvatarShop";
import { useGetUser } from "../../../../features/account/api/account";

import CreateParty from "../../../../features/party/components/party-comps/create-party/CreateParty";
import useUserStore from "../../../../stores/useUserStore";
import { useEffect } from "react";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const { data: user } = useGetUser(); 

  console.log("User: ", user)

  const { setUserId } = useUserStore(); 
  const [avatarShopOpen, { open: openAvatarShop, close: closeAvatarShop }] =
    useDisclosure(false);

  const [
    createPartyOpened,
    { open: openCreateParty, close: closeCreateParty },
  ] = useDisclosure(false);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user, setUserId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CreateParty isOpened={createPartyOpened} onClose={closeCreateParty} />
      <AvatarShop
        avatarShopOpen={avatarShopOpen}
        closeAvatarShop={closeAvatarShop}
        user={user}
      />
      <SidebarNavAuth
        user={user}
        closeNav={onClose}
        onOpenAvatarShop={openAvatarShop}
        onOpenCreateParty={openCreateParty}
      />
    </>
  );
}

export default Sidebar;
