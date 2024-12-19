import { Box } from "@mantine/core";
import { ReactNode } from "react";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";

type PageHeaderProps = {
  children?: ReactNode;
};

function PageHeader({ children }: PageHeaderProps) {
  const { isLightMode } = useGetColorTheme();

  return (
    <Box
      bg="secondary"
      px={32}
      py={16}
      style={{
        borderBottom: isLightMode ? "1px solid #DCDEE0" : "1px solid #3A3A3A",
      }}
    >
      {children}
    </Box>
  );
}

export default PageHeader;
