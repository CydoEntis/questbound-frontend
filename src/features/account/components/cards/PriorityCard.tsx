import { Group, Paper, Stack, Title } from "@mantine/core";
import AnimatedNumber from "../../../../components/animation/AnimatedNumber";
import useGetColorTheme from "../../../../components/theme/hooks/useGetColorScheme";

type PriorityCardProps = {
  title: string;
  targetValue: number;
  color: "blue" | "yellow" | "orange" | "red";
};

const PriorityCard = ({ title, color, targetValue }: PriorityCardProps) => {
  const { isLightMode } = useGetColorTheme();

  const lightColorMapping = {
    blue: "#E4F1FC",
    yellow: "#FEF7E5",
    orange: "#FFF2E7",
    red: "#FEEDED",
  };

  const darkColorMapping = {
    blue: "#24394B",
    yellow: "#443920",
    orange: "#453222",
    red: "#442B2B",
  };

  const bgColor = isLightMode
    ? lightColorMapping[color]
    : darkColorMapping[color];

  return (
    <Paper
      p={16}
      withBorder
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
      }}
    >
      <Stack gap={8} justify="center" align="center" h={100}>
        <Group>
          <Title size="xl" style={{ color: "white" }}>
            {title}
          </Title>
          <AnimatedNumber targetValue={targetValue} />
        </Group>
      </Stack>
    </Paper>
  );
};

export default PriorityCard;
