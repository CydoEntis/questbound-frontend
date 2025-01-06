import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../stores/useAuthStore";
import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Image,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import QuestPage from "../assets/quest-page.png";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  const { checkIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkIsAuthenticated()) {
      navigate({ to: "/dashboard" });
    }
  }, [checkIsAuthenticated, navigate]);

  return (
    <Box
      bg="primary"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 60px)",
        height: "100%",
        position: "relative",
      }}
    >
      <Container size="xl" w="100%" h="100vh">
        <Stack align="center" gap={1} my={80}>
          <Title ta="center" size="4rem">
            Level Up Your Productivity
          </Title>
          <Title ta="center" size="2.5rem">
            RPG-Driven Project Management
          </Title>
          <Text c="dimmed">
            Join a party, complete quests, level up, earn rewards, and unlock
            avatars—all while accomplishing your tasks and goals in a fun,
            gamified experience.
          </Text>
          <Group gap={8} mt={16}>
            <Button
              variant="light"
              color="violet"
              size="xl"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Group>
        </Stack>
        <Paper withBorder radius="lg">
          <Image src={QuestPage} w="100%" radius="lg" />
        </Paper>

        <SimpleGrid cols={{ base: 1, md: 3 }} my={32}>
          <Paper p={16}>
            <Paper p={8} radius="md" bg="violet" w={40} my={8}>
              <Text ta="center" fw="bold">
                01
              </Text>
            </Paper>
            <Title size="lg">Join a Party</Title>
            <Text>
              Just like in RPGs, your journey starts when you join a party. A
              party represents your project or team. You and your teammates will
              work together to accomplish your shared goals
            </Text>
          </Paper>
          <Paper p={16}>
            <Paper p={8} radius="md" bg="violet" w={40} my={8}>
              <Text ta="center" fw="bold">
                02
              </Text>
            </Paper>
            <Title size="lg">Complete Quests</Title>
            <Text>
              Every quest is a task to be completed. Whether it's a deadline, a
              milestone, or a simple to-do, completing quests helps you progress
              and earn rewards.
            </Text>
          </Paper>
          <Paper p={16}>
            <Paper p={8} radius="md" bg="violet" w={40} my={8}>
              <Text ta="center" fw="bold">
                03
              </Text>
            </Paper>
            <Title size="lg">Unlock Avatars</Title>
            <Text>
              With every quest completed, earn experience and gold to unlock
              different avatars.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
