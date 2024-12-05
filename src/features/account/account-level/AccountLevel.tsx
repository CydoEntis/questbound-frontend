import { Stack, Tooltip, Progress, Text } from "@mantine/core";
import { AuthenticatedUser } from "../../auth/shared/types";
import { getPercentage } from "../../user/utils/utils";

type AccountLevelProps = {
  user: AuthenticatedUser;
};

function AccountLevel({ user }: AccountLevelProps) {
  const percentage = getPercentage(user.currentExp, user.expToNextLevel);

  return (
    <Stack gap={4} py={8} w="100%">
      <Text>Level: {user.currentLevel}</Text>
      <Tooltip
        label={`${user.expToNextLevel - user.currentExp} exp to go`}
        position="bottom"
      >
        <Progress
          w="100%"
          radius="md"
          value={percentage}
          size="md"
          animated
          color="violet"
        />
      </Tooltip>
    </Stack>
  );
}

export default AccountLevel;
