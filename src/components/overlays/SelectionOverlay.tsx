import { Box } from "@mantine/core";
import styles from "./selection-overlay.module.css";
import { ReactNode } from "react";

type SelectionOverlayProps = {
  children: ReactNode;
};

function SelectionOverlay({ children }: SelectionOverlayProps) {
  return (
    <Box>
      <Box className={styles.overlay}></Box>
      {children}
    </Box>
  );
}

export default SelectionOverlay;
