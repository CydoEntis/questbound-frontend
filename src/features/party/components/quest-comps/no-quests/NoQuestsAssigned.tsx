import { Center, Paper, Stack, Title, Anchor, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

function NoQuestsAssigned() {
  return (
    <Center>
      <Paper p={32} withBorder>
        <Stack align="center">
          <Title>UH OH!</Title>
          <Text size="xl">You haven't been assigned to any quests yet 👀</Text>
          <Text size="xs" c="dimmed">
            Please contact your party leader
          </Text>
          <Anchor
            component={Link}
            to="/parties"
            size="sm"
            c="violet"
            variant="link"
          >
            View All Parties
          </Anchor>
        </Stack>
      </Paper>
    </Center>
  );
}

export default NoQuestsAssigned;
