import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

import Header from "./navigation/header/Header";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import Sidebar from "./navigation/sidebar/Sidebar";
import SlideInRightTransition from "../transitions/SlideInRightTransition";
import useAuthStore from "../../stores/useAuthStore";

export function Layout() {
  const { user, checkIsAuthenticated } = useAuthStore();
  const { isLightMode } = useGetColorTheme();
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  // Check if the current route is "/" (hide sidebar for index route)
  const isAuthenticated = checkIsAuthenticated();
  const hideSidebar = location.pathname === "/";

  useEffect(() => {
    checkIsAuthenticated();
  }, [user, checkIsAuthenticated]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        isAuthenticated && !hideSidebar
          ? {
              width: { base: 200, md: 300 },
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }
          : undefined
      }
    >
      <AppShell.Header>
        <Header
          isAuthenticated={isAuthenticated}
          opened={opened}
          toggle={toggle}
        />
      </AppShell.Header>

      {isAuthenticated && !hideSidebar ? (
        <AppShell.Navbar
          p="md"
          style={{
            borderColor: isLightMode ? "#DCDEE0" : "#3A3A3A",
            overflowY: "auto",
            height: "100vh",
          }}
        >
          <Sidebar onClose={close} />
        </AppShell.Navbar>
      ) : null}

      <AppShell.Main
        style={{ backgroundColor: isLightMode ? "#F5F4F4" : "#111111" }}
        w="100%"
        mih="calc(100vh - 60px)"
        h="100%"
      >
        <SlideInRightTransition key={location.pathname}>
          <Outlet />
        </SlideInRightTransition>
      </AppShell.Main>
    </AppShell>
  );
}
