import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { Center, Container, Title, Text, Button } from "@mantine/core";
import { createRootRouteWithContext, Link } from "@tanstack/react-router";
import { Layout } from "../components/layout/Layout";
import theme from "../components/theme/theme.config";
import { AuthState } from "../stores/useAuthStore";
import { UserState } from "../stores/useUserStore";

export type RouterContext = {
  authState: AuthState;
  userState: UserState;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <Center style={{ minHeight: "calc(100vh - 60px)", height: "100%" }}>
        <Container style={{ textAlign: "center", maxWidth: 600 }}>
          <Title order={1} c="violet" style={{ fontSize: "5rem", margin: 0 }}>
            404
          </Title>
          <Text size="lg" mt="md">
            Oops! The page you're looking for doesn't exist.
          </Text>
          <Button
            component={Link}
            to="/"
            variant="outline"
            color="violet"
            size="md"
            mt="xl"
          >
            Go Back Home
          </Button>
        </Container>
      </Center>
    );
  },
});

function RootComponent() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <Layout />
 
    </MantineProvider>
  );
}
