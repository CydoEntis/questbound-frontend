import {
  Box,
  Paper,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Group,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  useGetQuestBreakdown,
  useGetUserStats,
} from "../../features/account/api/account";
import { Users2 } from "lucide-react";
import { motion } from "framer-motion";

// Create the route
export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Index,
});

// Reusable Animated Number Component
const AnimatedNumber = ({ targetValue }: { targetValue: number }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((prevValue) => {
        const nextValue = Math.min(prevValue + 1, targetValue);
        if (nextValue === targetValue) clearInterval(interval);
        return nextValue;
      });
    }, 50); // Adjust this interval for different speed of animation

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Text size="2.5rem">{displayValue}</Text>
    </motion.div>
  );
};

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

  return (
    <Box p={{ base: 16, md: 32 }}>
      <Stack gap={16}>
        <SimpleGrid cols={4}>
          <Paper
            p={16}
            withBorder
            bg="card"
            h={200}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack gap={8} justify="center" align="center" h={180}>
              <Title>Joined Parties</Title>
              <Group>
                <Users2 size={32} />
                {/* Animate the number from 0 to the actual value */}
                <AnimatedNumber targetValue={userStats?.partiesJoined || 0} />
              </Group>
            </Stack>
          </Paper>

          <Paper p={16} withBorder bg="card">
            <Title>Total Quests</Title>
            <AnimatedNumber targetValue={userStats?.totalQuests || 0} />
          </Paper>

          <Paper p={16} withBorder bg="card">
            <Title>Completed Quests</Title>
            <AnimatedNumber targetValue={userStats?.completedQuests || 0} />
          </Paper>

          <Paper p={16} withBorder bg="card">
            <Title>Past Due Quests</Title>
            <AnimatedNumber targetValue={userStats?.pastDueQuests || 0} />
          </Paper>
        </SimpleGrid>

        <SimpleGrid cols={2}>
          <Box bg="violet">Placeholder</Box>
          <Stack>
            <Paper p={16} withBorder bg="card">
              <Title>Unlocked Avatars</Title>
              <AnimatedNumber targetValue={userStats?.unlockedAvatarCount || 0} />
            </Paper>
            <Paper p={16} withBorder bg="card">
              <Title>Total Avatars</Title>
              <Text>
                <AnimatedNumber
                  targetValue={userStats?.unlockedAvatarCount || 0}
                />{" "}
                /{" "}
                <AnimatedNumber targetValue={userStats?.totalAvatarCount || 0} />
                {" "}avatars
              </Text>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
