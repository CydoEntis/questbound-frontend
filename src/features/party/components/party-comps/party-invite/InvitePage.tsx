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
  const { isAuthenticated } = useAuthStore();
  const acceptInviteMutation = useAcceptInvite();
  const [theToken, setTheToken] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const processInvite = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (token) {
        setTheToken(token);
      }

      //   if (!token) {
      //     navigate({ to: "/" });
      //     notifications.show({
      //       title: "Failed",
      //       message: "Invite could not be accepted",
      //       color: "red",
      //       position: "top-right",
      //     });
      //     return;
      //   }

      //   if (isAuthenticated) {
      //     acceptInviteMutation.mutate(token); // Trigger the mutation to accept the invite
      //   } else {
      //     navigate({ to: `/login?redirect=/invite?token=${token}` });
      //   }
      // };
    };
    processInvite();
  }, []);

  return (
    <Box pos="relative">
      <PartiesPageLoadingSkeleton />
      <Paper
        pos="absolute"
        left="50%" 
        style={{
          top: isMobile ? "2%" : "50%",
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
