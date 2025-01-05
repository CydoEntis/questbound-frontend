import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Text } from "@mantine/core";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";

const AnimatedNumber = ({
  targetValue,
  color,
}: {
  targetValue: number;
  color:
    | "blue"
    | "yellow"
    | "orange"
    | "red"
    | "indigo"
    | "pink"
    | "lime"
    | "violet"
    | "grape";
}) => {
  const { isLightMode } = useGetColorTheme();

  const lightTextColorMapping = {
    indigo: "#4C6EF5",
    pink: "#E64980",
    lime: "#82C91E",
    violet: "#7950F2",
    grape: "#C74BDB",
    blue: "#58C0FC",
    yellow: "#FFE066",
    orange: "#FFC078",
    red: "#FFA8A8",
  };

  const darkTextColorMapping = {
    indigo: "#70A7FF",
    pink: "#FAA2C1",
    lime: "#C0EB75",
    violet: "#B197FC",
    grape: "#E599F7",
    blue: "#228BE6",
    yellow: "#FAB005",
    orange: "#FD7E14",
    red: "#FB5252",
  };

  const textColor = isLightMode
    ? lightTextColorMapping[color]
    : darkTextColorMapping[color];

  const [displayValue, setDisplayValue] = useState<number>(0);

  const duration = 0.5;

  useEffect(() => {
    const totalFrames = duration * 60;
    let frame = 0;

    const interval = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const newValue = Math.floor(targetValue * progress);
      setDisplayValue(newValue);

      if (progress === 1) {
        clearInterval(interval);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
      }}
    >
      <Text ta="center" size="2.25rem" style={{ color: textColor }}>
        {displayValue}
      </Text>
    </motion.div>
  );
};

export default AnimatedNumber;
