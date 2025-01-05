import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";
import { useAcceptInvite } from "../../../api/party";
import PartiesPageLoadingSkeleton from "../parties-loader/PartiesPageLoadingSkeleton";
import { Text, Button, Paper, Stack, Box, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const InvitePage = () => {
  const navigate = useNavigate();
  const acceptInviteMutation = useAcceptInvite();
  const isMobile = useMediaQuery("(max-width: 1090px)");
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const acceptInvite = async () => {
    if (!token) {
      notifications.show({
        title: "Failed",
        message: "Invalid token",
        color: "red",
        position: "top-right",
      });
      navigate({ to: "/" });
      return;
    }

    await acceptInviteMutation.mutateAsync(token);
  };

  const declineInvite = async () => {
    navigate({ to: "/" });
    return;
  };

  return (
    <Box pos="relative">
      <PartiesPageLoadingSkeleton />
      <Paper
        pos="absolute"
        left="50%"
        style={{
          top: isMobile ? "2%" : "10%",
          transform: "translateX(-50%)",
        }}
        miw={300}
        mih={200}
        p={32}
        withBorder
      >
        <Stack gap={16} justify="center" align="center" mih={200}>
          <Text ta="center">Are you sure you want to join the party?</Text>
          <Flex gap={8}>
            <Button variant="light" color="violet" onClick={acceptInvite}>
              Accept Invite
            </Button>
            <Button variant="light" color="red" onClick={declineInvite}>
              Decline Invite
            </Button>
          </Flex>
        </Stack>
      </Paper>
    </Box>
  );
};

export default InvitePage;
