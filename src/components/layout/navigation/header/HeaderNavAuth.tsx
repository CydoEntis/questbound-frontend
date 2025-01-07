import { Flex, Group, Image, Button, Box } from "@mantine/core";
import { ReactElement } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import Logo from "../../../../assets/logo.png";
import useAuthStore from "../../../../stores/useAuthStore";
import { useLogout } from "../../../../features/auth/api/auth";

type HeaderNavAuthProps = {
  mobileNavToggle: ReactElement;
};

function HeaderNavAuth({ mobileNavToggle }: HeaderNavAuthProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.checkIsAuthenticated());
  const logout = useLogout();

  const logoutHandler = async () => {
    await logout.mutateAsync();
    navigate({
      to: "/login",
      search: { redirect: undefined },
    });
  };

  return (
    <Flex align="center" justify="space-between" h="100%" px={16}>
      <Box component={Link} to="/">
        <Image src={Logo} w={200} />
      </Box>
      <Group>
        {location.pathname !== "/" && mobileNavToggle}
        {isAuthenticated && location.pathname === "/" && (
          <>
            <Button
              component={Link}
              to="/dashboard"
              variant="light"
              color="violet"
            >
              Dashboard
            </Button>
            <Button onClick={logoutHandler} variant="outline" color="violet">
              Logout
            </Button>
          </>
        )}
      </Group>
    </Flex>
  );
}

export default HeaderNavAuth;
