import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../stores/useAuthStore";
import {
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Image,
  Paper,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import QuestPageDark from "../assets/quest-page-dark.png";
import AvatarShopDark from "../assets/avatar-shop-dark.png";
import QuestDark from "../assets/quest-dark.png";
import PartyPageDark from "../assets/party-page-dark.png";

import QuestPageLight from "../assets/quest-page-light.png";
import AvatarShopLight from "../assets/avatar-shop-light.png";
import QuestLight from "../assets/quest-light.png";
import PartyPageLight from "../assets/party-page-light.png";
import useGetColorTheme from "../components/theme/hooks/useGetColorScheme";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  const { checkIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { isLightMode } = useGetColorTheme();
  
  useEffect(() => {
    if (checkIsAuthenticated()) {
      navigate({ to: "/dashboard" });
    }
  }, [checkIsAuthenticated, navigate]);

  return (
    <Container size="xl" w="100%" py={32}>
      <Stack gap={32}>
        <Stack align="center" gap={1} py={80}>
          <Title ta="center" size="h3" order={3}>
            Level Up Your Productivity
          </Title>
          <Title ta="center" size="h1" order={1}>
            RPG-Driven Project Management
          </Title>
          <Text c="dimmed" ta="center" size="sm">
            Join a party, complete quests, level up, earn rewards, and unlock
            avatars—all while accomplishing your tasks and goals in a fun,
            gamified experience.
          </Text>
          <Group gap={8} mt={16}>
            <Button
              variant="light"
              color="violet"
              size="lg"
              component={Link}
              to="/register"
            >
              Get Started
            </Button>
          </Group>
        </Stack>
        <Paper withBorder radius="sm">
          <Image src={QuestPageDark} w="100%" radius="sm" />
        </Paper>
      </Stack>

      <Stack gap={64} mt={{ base: 128, md: 256 }}>
        <Stack gap={16}>
          <Title ta="center" fw="bold" size="h3" order={3} c="violet">
            Benefits
          </Title>
          <Title ta="center" fw="bold" size="h1" order={1}>
            Gamify Your Management
          </Title>
          <Text c="dimmed" ta="center">
            Project management doesn't have to be boring
          </Text>
        </Stack>
        <Grid gutter={32}>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
            <Paper withBorder radius="lg">
              <Image src={PartyPageDark} w="100%" radius="lg" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
            <Stack gap={16}>
              <Paper p={8} radius="md" bg="violet" w={40} my={8}>
                <Text ta="center" fw="bold">
                  01
                </Text>
              </Paper>
              <Title size="xl">Join a Party</Title>
              <Text>
                Ready to kickstart an epic adventure? The first step is to join
                a party—your very own squad of heroes (a.k.a. your team or
                project group). A party is where the magic happens:
                collaborating, brainstorming, and conquering challenges
                together. It’s like forming your dream team to tackle quests,
                slay deadlines, and achieve greatness, all while leveling up
                your skills and camaraderie. Let the journey begin!
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter={32}>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 1 }}>
            <Stack gap={16}>
              <Paper p={8} radius="md" bg="violet" w={40} my={8}>
                <Text ta="center" fw="bold">
                  02
                </Text>
              </Paper>
              <Title size="lg">Complete Quests</Title>
              <Text>
                Every great adventure is packed with quests, and here’s where
                you shine! Whether it’s smashing through a to-do list, hitting a
                big milestone, or slaying a looming deadline, quests are your
                ticket to glory. Each completed quest brings you one step closer
                to unlocking epic rewards and basking in the satisfaction of
                progress. Gear up and show the world what you’re capable of—one
                quest at a time!
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 2 }}>
            <Paper withBorder radius="lg">
              <Image src={QuestDark} w="100%" radius="lg" />
            </Paper>
          </Grid.Col>
        </Grid>
        <Grid gutter={32}>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
            <Paper withBorder radius="lg">
              <Image src={AvatarShopDark} w="100%" radius="lg" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
            <Stack gap={16}>
              <Paper p={8} radius="md" bg="violet" w={40} my={8}>
                <Text ta="center" fw="bold">
                  03
                </Text>
              </Paper>
              <Title size="lg">Unlock Avatars</Title>
              <Text>
                Who doesn’t love a little flair? As you crush quests and climb
                the ranks, you’ll earn gold and experience points to unlock
                amazing avatars. Customize your look, stand out from the crowd,
                and let your personality shine in every interaction. Think of
                your avatar as your digital alter ego—bold, unique, and totally
                you. Start unlocking and make your journey as stylish as it is
                rewarding!
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>

      <Stack gap={64} mt={{ base: 128, md: 256 }}>
        <Stack gap={16}>
          <Title ta="center" fw="bold" size="h3" order={3} c="violet">
            Features
          </Title>
          <Title ta="center" fw="bold" size="h1" order={1}>
            Embark on Your Productivity Adventure
          </Title>
          <Text c="dimmed" ta="center">
            Welcome to the ultimate fusion of work and play! Transform your task
            list into an epic RPG journey where every to-do is a quest, every
            achievement earns you rewards, and every party member helps you
            level up. Ready to conquer the grind? Let’s dive into the adventure!
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, md: 4 }} spacing={32}>
          <Paper p={16} radius="md" withBorder bg="card">
            <Stack gap={16}>
              <Title size="1.65rem">Party Up! </Title>
              <Text>
                Teamwork makes the dream work! Create or join a party with your
                friends or coworkers to tackle quests together. Invite your
                favorite adventurers and rally your crew for the ultimate
                productivity journey.
              </Text>
            </Stack>
          </Paper>

          <Paper p={16} radius="md" withBorder bg="card">
            <Stack gap={16}>
              <Title size="1.65rem">Quest Masters </Title>
              <Text>
                Your tasks are now epic quests! Create, edit, delete, or
                complete quests to help your party level up. Watch as mundane
                to-dos turn into legendary milestones. Are you ready to conquer
                the list?
              </Text>
            </Stack>
          </Paper>

          <Paper p={16} radius="md" withBorder bg="card">
            <Stack gap={16}>
              <Title size="1.65rem">Epic Avatars</Title>
              <Text>
                Earn rewards and XP for completing quests. Level up to unlock
                avatars, badges, and exclusive gear for your adventurer. The
                more you achieve, the more epic your journey becomes!
              </Text>
            </Stack>
          </Paper>

          <Paper p={16} radius="md" withBorder bg="card">
            <Stack gap={16}>
              <Title size="1.65rem">Party Management</Title>
              <Text>
                Your party, your rules! Manage your group’s quests, assign
                tasks, and keep everyone on track. Collaborate like a pro and
                ensure your team reaches the finish line together.
              </Text>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
      <Paper p={32} my={{ base: 110, md: 220 }} withBorder>
        <Stack gap={16}>
          <Title order={1} size="h1">
            Level Up Your Productivity Game{" "}
          </Title>
          <Text c="dimmed">
            Turn your daily grind into an epic quest! Join forces with your
            team, tackle quests, and unlock rewards together. It's time to slay
            deadlines, gain XP, and make work feel like an adventure. Ready to
            start your journey?
          </Text>
          <Button variant="light" color="violet" size="xl" w={260}>
            Get Started Now
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
