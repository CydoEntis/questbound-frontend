import {
  Box,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Progress,
  Flex,
  Image,
} from "@mantine/core";
import { useEffect } from "react";
import {
  useGetQuestBreakdown,
  useGetUserStats,
} from "../../features/account/api/account";
import {
  CalendarCheck,
  CheckCheck,
  LockKeyholeOpen,
  Sparkle,
  Users2,
} from "lucide-react";

import { createFileRoute } from "@tanstack/react-router";
import StatCard from "../../features/account/components/cards/StatCard";
import TotalAvatarsCard from "../../features/account/components/avatar-card/TotalAvatarsCard";
import AvatarDisplay from "../../features/avatar/components/avatar-display/AvatarDisplay";
import { getPercentage } from "../../shared/utils/account.utils";

import Gold from "../../assets/gold.png";
import PriorityCard from "../../features/account/components/cards/PriorityCard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Index,
});

function Index() {
  const {
    data: userStats,
    error: userStatsError,
    isLoading: isUserStatsLoading,
  } = useGetUserStats();

  const requestDto = { year: 2025, month: 1 };
  const {
    data: questBreakdown,
    error: questBreakdownError,
    isLoading: isQuestBreakdownLoading,
  } = useGetQuestBreakdown(requestDto);

  useEffect(() => {
    if (userStats) {
      console.log("User Stats:", userStats);
    }
    if (questBreakdown) {
      console.log("Quest Breakdown:", questBreakdown);
    }

    if (userStatsError) {
      console.error("Error fetching user stats:", userStatsError);
    }
    if (questBreakdownError) {
      console.error("Error fetching quest breakdown:", questBreakdownError);
    }
  }, [userStats, questBreakdown, userStatsError, questBreakdownError]);

  if (isUserStatsLoading) return <div>Loading...</div>;

  let percentage = 0;
  if (userStats) {
    percentage = getPercentage(
      userStats!.currentExperience,
      userStats!.experienceToLevelUp
    );
  }

  return (
    <Box p={{ base: 16, md: 32 }}>
      <Stack gap={16}>
        <Paper withBorder p={32}>
          <Group w="100%">
            <Stack gap={8} w="100%">
              <Flex justify={"space-between"} w="100%">
                <Group gap={8}>
                  <AvatarDisplay avatar={userStats!.currentAvatar} size="xl" />
                  <Title> {userStats?.username}</Title>
                </Group>
                <Group gap={4}>
                  <Text size="1.5rem">{userStats!.gold}</Text>
                  <Image src={Gold} w={40} />
                </Group>
              </Flex>
              <Text>Level: {userStats?.currentLevel}</Text>
            </Stack>
            <Progress
              w="100%"
              radius="md"
              value={percentage}
              size="md"
              animated
              color="violet"
            />
          </Group>
        </Paper>
        <Stack gap={16}>
          <SimpleGrid cols={3}>
            <StatCard
              title="Total Quests"
              icon={<Sparkle size={32} />}
              targetValue={userStats?.totalQuests || 0}
            />
            <StatCard
              title="Completed Quests"
              icon={<CheckCheck size={32} />}
              targetValue={userStats?.completedQuests || 0}
            />
            <StatCard
              title="Past Due Quests"
              icon={<CalendarCheck size={32} />}
              targetValue={userStats?.pastDueQuests || 0}
            />
          </SimpleGrid>
          <SimpleGrid cols={4}>
            <PriorityCard
              title="Low Priority Quests"
              color="blue"
              targetValue={userStats?.lowQuests || 0}
            />
            <PriorityCard
              title="Medium Priority Quests"
              color="yellow"
              targetValue={userStats?.mediumQuests || 0}
            />
            <PriorityCard
              title="High Priority Quests"
              color="orange"
              targetValue={userStats?.highQuests || 0}
            />
            <PriorityCard
              title="Critical Priority Quests"
              color="red"
              targetValue={userStats?.criticalQuests || 0}
            />
          </SimpleGrid>

          <Grid>
            <Grid.Col span={8}>
              <Box bg="violet">Placeholder</Box>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack>
                <StatCard
                  title="Joined Parties"
                  icon={<Users2 size={32} />}
                  targetValue={userStats?.partiesJoined || 0}
                />
                <TotalAvatarsCard
                  icon={<LockKeyholeOpen size={32} />}
                  unlockedAvatarCount={userStats?.unlockedAvatarCount || 0}
                  totalAvatarCount={userStats?.totalAvatarCount || 0}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
