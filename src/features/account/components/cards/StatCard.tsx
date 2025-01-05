import { Group, Paper, Stack, Title } from "@mantine/core";
import AnimatedNumber from "../../../../components/animation/AnimatedNumber";
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  icon: ReactNode;
  targetValue: number;
};

const StatCard = ({ title, icon, targetValue }: StatCardProps) => (
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
      <Title>{title}</Title>
      <Group>
        {icon}
        <AnimatedNumber targetValue={targetValue} />
      </Group>
    </Stack>
  </Paper>
);

export default StatCard;
