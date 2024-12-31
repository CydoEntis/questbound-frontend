import { useDisclosure } from "@mantine/hooks";
import SidebarNavAuth from "./SidebarNavAuth";
import AvatarShop from "../../../../features/avatar/components/avatar-shop/AvatarShop";
import { useGetUser } from "../../../../features/account/api/account";

import CreateParty from "../../../../features/party/components/party-comps/create-party/CreateParty";
import useUserStore from "../../../../stores/useUserStore";
import { useEffect } from "react";
import { Skeleton, Stack } from "@mantine/core";

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const { data: user } = useGetUser();

  console.log("User: ", user);

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
    return (
      <Stack
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 120px)",
        }}
      >
        <Stack
          gap={16}
          style={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <Skeleton height={60} />
          <Skeleton height={50} />

          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Stack>

        <Stack mt="auto">
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Stack>
      </Stack>
    );
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
