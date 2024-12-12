import { Box, Flex, Group, Title } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import { MEMBER_ROLES } from "../../shared/utils/constants";
import { MemberRole } from "../../shared/types";

type PageHeaderProps = {
  title: string;
  optionsComp?: ReactElement;
  actionBtn?: ReactElement;
  children?: ReactNode;
  userRole?: MemberRole;
};

function PageHeader({
  title,
  optionsComp,
  actionBtn,
  children,
  userRole,
}: PageHeaderProps) {
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
      <Flex justify="space-between" align="center" w="100%" pb={16}>
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
      </Flex>
      {children}
    </Box>
  );
}

export default PageHeader;
