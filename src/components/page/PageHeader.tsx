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
      {/* <Flex justify="space-between" align="center" w="100%" pb={16}>
        <Group align="center" w="100%" justify="space-between">
          <Group>
            <Title size="2.5rem">{title}</Title>
            {(userRole === MEMBER_ROLES.CREATOR ||
              userRole === MEMBER_ROLES.MAINTAINER) &&
              optionsComp}
          </Group>
          {(userRole === MEMBER_ROLES.CREATOR ||
            userRole === MEMBER_ROLES.MAINTAINER) &&
            actionBtn && <Box>{actionBtn}</Box>}
        </Group>
      </Flex> */}
      {children}
    </Box>
  );
}

export default PageHeader;
