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

  const lightBgColorMapping = {
    blue: "#E4F1FC",
    yellow: "#FEF7E5",
    orange: "#FFF2E7",
    red: "#FEEDED",
  };

  const darkBgColorMapping = {
    blue: "#24394B",
    yellow: "#443920",
    orange: "#453222",
    red: "#442B2B",
  };

  const lightTextColorMapping = {
    blue: "#58C0FC",
    yellow: "#FFE066",
    orange: "#FFC078",
    red: "#FFA8A8",
  };

  const darkTextColorMapping = {
    blue: "#228BE6",
    yellow: "#FAB005",
    orange: "#FD7E14",
    red: "#FB5252",
  };

  const bgColor = isLightMode
    ? lightBgColorMapping[color]
    : darkBgColorMapping[color];

  const textColor = isLightMode
    ? lightTextColorMapping[color]
    : darkTextColorMapping[color];

  return (
    <Paper
      p={16}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
      }}
    >
      <Stack gap={8} justify="center" align="center" h={100}>
        <Title ta="center" size="xl" style={{ color: textColor }}>
          {title}
        </Title>
        <AnimatedNumber targetValue={targetValue} color={color} />
      </Stack>
    </Paper>
  );
};

export default PriorityCard;
