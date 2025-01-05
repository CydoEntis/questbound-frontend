import { Paper, Title, Text, Group, Stack } from "@mantine/core";
import AnimatedNumber from "../../../../components/animation/AnimatedNumber";
import useGetColorTheme from "../../../../components/theme/hooks/useGetColorScheme";

interface TotalAvatarsCardProps {
  unlockedAvatarCount: number;
  totalAvatarCount: number;
}

const TotalAvatarsCard = ({
  unlockedAvatarCount,
  totalAvatarCount,
}: TotalAvatarsCardProps) => {
  const { isLightMode } = useGetColorTheme();

  const lightBgColor = "#E4F1FC";
  const darkBgColor = "#3B2A40";

  const lightTextColor = "#58C0FC";
  const darkTextColor = "#E599F7";

  const bgColor = isLightMode ? lightBgColor : darkBgColor;
  const textColor = isLightMode ? lightTextColor : darkTextColor;

  return (
    <Paper
      p={16}
      style={{
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack gap={8} justify="center" align="center" h={180}>
        <Title style={{ color: textColor }}>Total Avatars</Title>
        <Group>
          <AnimatedNumber targetValue={unlockedAvatarCount} color="grape" />
          <Text ta="center" style={{ color: textColor }} size="3rem">
            /
          </Text>
          <AnimatedNumber targetValue={totalAvatarCount} color="grape" />
        </Group>
      </Stack>
    </Paper>
  );
};

export default TotalAvatarsCard;
