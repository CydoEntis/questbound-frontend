import { useDisclosure } from "@mantine/hooks";
import SidebarNavAuth from "./SidebarNavAuth";
import AvatarShop from "../../../../features/avatar/components/avatar-shop/AvatarShop";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../../features/account/shared/account.types";
import accountService from "../../../../features/account/api/account.service";
import { useGetUser } from "../../../../features/account/api/account";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  // Type the user data retrieved from the cache
  const { data: user, isPending } = useGetUser();

  const [avatarShopOpen, { open: openAvatarShop, close: closeAvatarShop }] =
    useDisclosure(false);

  // Handle missing user data
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AvatarShop
        avatarShopOpen={avatarShopOpen}
        closeAvatarShop={closeAvatarShop}
        user={user} // Ensure this matches AvatarShop's props
      />
      <SidebarNavAuth
        user={user} // Ensure this matches SidebarNavAuth's props
        closeNav={onClose}
        onOpenAvatarShop={openAvatarShop}
      />
    </>
  );
}

export default Sidebar;
