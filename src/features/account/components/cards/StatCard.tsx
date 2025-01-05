import { Group, Paper, Stack, Title } from "@mantine/core";
import AnimatedNumber from "../../../../components/animation/AnimatedNumber";
import useGetColorTheme from "../../../../components/theme/hooks/useGetColorScheme";

type StatCardProps = {
  title: string;
  targetValue: number;
  color: "indigo" | "pink" | "lime" | "violet" | "grape";
};

const StatCard = ({ title, targetValue, color }: StatCardProps) => {
  const { isLightMode } = useGetColorTheme();

  const lightBgColorMapping = {
    indigo: "#EDF0FE",
    pink: "#FCECF2",
    lime: "#F0F8E4",
    violet: "#EFEAFD",
    grape: "#F7E9FB",
  };

  const darkBgColorMapping = {
    indigo: "#2A2F43",
    pink: "#412A32",
    lime: "#323D23",
    violet: "#312B43",
    grape: "#3B2A40",
  };

  const lightTextColorMapping = {
    indigo: "#4C6EF5",
    pink: "#E64980",
    lime: "#82C91E",
    violet: "#7950F2",
    grape: "#C74BDB",
  };

  const darkTextColorMapping = {
    indigo: "#70A7FF",
    pink: "#FAA2C1",
    lime: "#C0EB75",
    violet: "#B197FC",
    grape: "#E599F7",
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
      <Stack gap={8} justify="center" align="center" h={180}>
        <Title style={{ color: textColor }}>{title}</Title>
        <Group>
          <AnimatedNumber targetValue={targetValue} color={color} />
        </Group>
      </Stack>
    </Paper>
  );
};

export default StatCard;
