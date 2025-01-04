import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";
import useAuthStore from "../../../../../stores/useAuthStore";
import { useAcceptInvite } from "../../../api/party";
import PartiesPageLoadingSkeleton from "../parties-loader/PartiesPageLoadingSkeleton";
import { Text, Button, Group, Paper, Stack, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const InvitePage = () => {
  const navigate = useNavigate();
  const acceptInviteMutation = useAcceptInvite();
  const isMobile = useMediaQuery("(max-width: 768px)");
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

    await acceptInviteMutation.mutate(token);
  };



  return (
    <Box pos="relative">
      <PartiesPageLoadingSkeleton />
      <Paper
        pos="absolute"
        left="50%"
        style={{
          top: isMobile ? "2%" : "30%",
          transform: "translateX(-50%)",
        }}
        miw={300}
        mih={200}
        p={32}
        withBorder
      >
        <Stack gap={32} justify="center" align="center" mih={200}>
          <Text>Are you sure you want to join the party?</Text>
          <Group>
            <Button variant="light" color="violet">
              Accept Invite
            </Button>
            <Button variant="light" color="violet">
              Reject Invite
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
};

export default InvitePage;
