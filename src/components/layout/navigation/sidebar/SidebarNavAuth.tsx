import { Button, Flex, Indicator, NavLink, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Book,
  BookOpen,
  LayoutGrid,
  LogOut,
  PlusCircle,
  ShoppingBag,
  SquareLibrary,
} from "lucide-react";
import ThemeToggle from "../../../theme/ThemeToggle";
import { useState } from "react";
import { User } from "../../../../features/account/shared/account.types";
import { useGetRecentParties } from "../../../../features/party/api/party";
import { useLogout } from "../../../../features/auth/api/auth";
import AccountButton from "../../../../features/account/components/account-button/AccountButton";

type SidebarNavAuthProps = {
  user: User;
  closeNav: () => void;
  onOpenAvatarShop: () => void;
  onOpenCreateParty: () => void;
};

function SidebarNavAuth({
  user,
  closeNav,
  onOpenAvatarShop,
  onOpenCreateParty,
}: SidebarNavAuthProps) {
  const navigate = useNavigate();
  const { data: recentParties, isLoading, isError } = useGetRecentParties();
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const logout = useLogout();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClose = () => {
    if (isMobile) closeNav();
  };

  const logoutHandler = async () => {
    await logout.mutateAsync();
    navigate({
      to: "/login",
      search: { redirect: undefined },
    });
    handleClose();
  };

  const handleOpenNewParty = () => {
    onOpenCreateParty();
    handleClose();
  };

  const handleOpenAvatarShop = () => {
    onOpenAvatarShop();
    handleClose();
  };

  const toggleRecentOpen = () => {
    setIsRecentOpen((prev) => !prev);
  };

  const partyColors = ["red", "blue", "yellow", "green", "pink"];

  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
      }}
    >
      <Stack
        gap={8}
        style={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <AccountButton user={user!} />
        <Button
          color="violet"
          variant="light"
          rightSection={<PlusCircle size={20} />}
          h={40}
          onClick={handleOpenNewParty}
          my={20}
        >
          New Party
        </Button>
        <NavLink
          component={Link}
          to="/dashboard"
          leftSection={<LayoutGrid size={20} />}
          label="Dashboard"
          className="rounded-md"
          color="violet"
          onClick={handleClose}
        />
        <NavLink
          component={Link}
          to="/parties"
          leftSection={<SquareLibrary size={20} />}
          label="Your Parties"
          className="rounded-md"
          color="violet"
          onClick={handleClose}
        />
        <NavLink
          label="Most Recent"
          className="rounded-md"
          leftSection={
            isRecentOpen ? <BookOpen size={20} /> : <Book size={20} />
          }
          variant="subtle"
          color="gray"
          opened={isRecentOpen}
          onClick={toggleRecentOpen}
        >
          {isLoading && <Text size="xs">Loading recent parties...</Text>}
          {isError && (
            <Text size="xs" c="red">
              Failed to load recent parties
            </Text>
          )}
          {!isLoading && recentParties?.length === 0 && (
            <Text size="xs">No recent parties</Text>
          )}
          {recentParties?.map((party, index) => (
            <NavLink
              key={party.id}
              component={Link}
              to={`/parties/${party.id}`}
              label={
                <Flex align="center" gap={16} px={8}>
                  <Indicator
                    inline
                    color={partyColors[index % partyColors.length]}
                    processing
                    size={10}
                  />
                  <Text size="sm">{party.name}</Text>
                </Flex>
              }
              color="violet"
              mt={8}
              onClick={handleClose}
            />
          ))}
        </NavLink>
      </Stack>

      <Stack mt="auto">
        <Button
          justify="start"
          leftSection={<ShoppingBag size={20} />}
          variant="light"
          color="violet"
          h={40}
          onClick={handleOpenAvatarShop}
        >
          Avatar Shop
        </Button>
        <Button
          justify="start"
          leftSection={<LogOut size={20} />}
          variant="light"
          color="violet"
          h={40}
          onClick={logoutHandler}
        >
          Log out
        </Button>
        <ThemeToggle />
      </Stack>
    </Stack>
  );
}

export default SidebarNavAuth;
