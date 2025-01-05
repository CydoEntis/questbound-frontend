import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Text } from "@mantine/core";

const AnimatedNumber = ({ targetValue }: { targetValue: number }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  const duration = .5; 

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
    >
      <Text size="2.25rem">{displayValue}</Text>
    </motion.div>
  );
};

export default AnimatedNumber;
