import { Box } from "@mantine/core";
import { Check } from "lucide-react";
import styles from "./selection-overlay.module.css";

function SelectionOverlay() {
  return (
    <>
      <Box className={styles.overlay}></Box>
      <Check size={24} color="white" className={styles.check} />
    </>
  );
}

export default SelectionOverlay;
