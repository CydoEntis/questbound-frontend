import { Paper, Title, Text, Group, Stack } from "@mantine/core";
import AnimatedNumber from "../../../../components/animation/AnimatedNumber";
import { ReactNode } from "react";

interface TotalAvatarsCardProps {
  unlockedAvatarCount: number;
  totalAvatarCount: number;
  icon: ReactNode;
}

const TotalAvatarsCard = ({
  unlockedAvatarCount,
  totalAvatarCount,
  icon
}: TotalAvatarsCardProps) => (
  <Paper
    p={16}
    withBorder
    bg="card"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Stack gap={8} justify="center" align="center" h={180}>
      <Title>Total Avatars</Title>
      <Group>
        {icon}
        <AnimatedNumber targetValue={unlockedAvatarCount} />
        <Text size="3rem">/</Text>
        <AnimatedNumber targetValue={totalAvatarCount} />
        <Text size="1.5rem">avatars</Text>
      </Group>
    </Stack>
  </Paper>
);

export default TotalAvatarsCard;
