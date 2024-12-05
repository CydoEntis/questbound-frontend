import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation } from "@tanstack/react-router";

import TopBar from "./navigation/header/Header";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import Sidebar from "./navigation/sidebar/Sidebar";
import SlideInRightTransition from "../page-transitions/SlideInRightTransition";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";

export function Layout() {
  const { user, checkIsAuthenticated } = useAuthStore();
  const isLightMode = useGetColorTheme();
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    checkIsAuthenticated();
  }, [user, checkIsAuthenticated]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        checkIsAuthenticated()
          ? {
              width: { base: 200, md: 300 },
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }
          : undefined
      }
    >
      <AppShell.Header>
        <TopBar
          isAuthenticated={checkIsAuthenticated()}
          opened={opened}
          toggle={toggle}
        />
      </AppShell.Header>

      {checkIsAuthenticated() ? (
        <AppShell.Navbar
          p="md"
          bg="secondary"
          style={{
            navbar: {
              borderColor: isLightMode ? "#DCDEE0" : "#3A3A3A",
              overflowY: "auto",
              height: "100vh",
            },
          }}
        >
          <Sidebar onClose={close} />
        </AppShell.Navbar>
      ) : null}

      <AppShell.Main bg="primary">
        <SlideInRightTransition key={location.pathname}>
          <Outlet />
        </SlideInRightTransition>
      </AppShell.Main>
    </AppShell>
  );
}
