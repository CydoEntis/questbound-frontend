import {
  Box,
  Center,
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Group,
  ActionIcon,
  Progress,
  Tooltip,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import Avatar from "../../../features/avatars/avatar/Avatar";
import useAuthStore from "../../../stores/useAuthStore";
import { getPercentage } from "../../../features/user/utils/utils";
import classes from "./Profile.module.css"; // Import the CSS module
import { Edit, Edit2 } from "lucide-react";
import ChangePassword from "../../../features/auth/change-password/ChangePassword";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();

  if (!user) return <p>Loading...</p>;

  const percentage = getPercentage(user.currentExp, user.expToNextLevel);

  return (
    <Container fluid p={16}>
      {/* <Paper withBorder bg="secondary">
        <Center p={32}>
          <Stack gap={2} align="center" justify="center">
            <Box className={classes.avatarWrapper}>
              <div className={classes.avatarOverlay}></div>
              <Avatar size="xl" avatar={user.avatar} />
              <Text className={classes.editIcon} c="white">
                Change
              </Text>
            </Box>
            <Title>{user.username}</Title>
            <Text>{user.email}</Text>
            <Group>
              <Text>Lv: {user.currentLevel}</Text>
              <Tooltip
                label={`${user.expToNextLevel - user.currentExp} exp to go`}
                position="bottom"
              >
                <Box miw="300px" maw="500px">
                  <Progress
                    radius="md"
                    value={percentage}
                    size="md"
                    animated
                    color="violet"
                  />
                </Box>
              </Tooltip>
            </Group>
          </Stack>
        </Center>
      </Paper> */}
      <Paper withBorder bg="secondary">
        <Center p={32}>
          <Stack gap={2} align="center" justify="center" pos="relative">
            <ActionIcon
              pos="absolute"
              top={0}
              right={0}
              variant="light"
              color="violet"
            >
              <Edit size={20} />
            </ActionIcon>
            <Box>
              <Avatar size="xl" avatar={user.avatar} />
            </Box>
            <Title>{user.username}</Title>
            <Text>{user.email}</Text>
            <Group>
              <Text>Lv: {user.currentLevel}</Text>
              <Tooltip
                label={`${user.expToNextLevel - user.currentExp} exp to go`}
                position="bottom"
              >
                <Box miw="300px" maw="500px">
                  <Progress
                    radius="md"
                    value={percentage}
                    size="md"
                    animated
                    color="violet"
                  />
                </Box>
              </Tooltip>
            </Group>
          </Stack>
        </Center>
      </Paper>
      <Paper withBorder bg="secondary" p={32}>
        <ChangePassword />
      </Paper>
    </Container>
  );
}
