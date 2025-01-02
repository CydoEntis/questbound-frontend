import PartyModal from "../party-modals/PartyModal";
import { useGetPartyMembers, useLeaveParty } from "../../../api/party";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import PartyManagementForm from "./PartyManagementForm";
import PartyLeaderManagementForm from "./PartyLeaderManagementForm";
import { useState, useEffect } from "react";
import { Stack, Flex, Button, Group, Text, Paper } from "@mantine/core";
import PartyMemberDetail from "../party-member-details/PartyMemberDetail";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties";
import PartyLeaderRequiredGuard from "../party-leader-required/PartyLeaderRequiredGuard";
import LeaderOrCaptainOnlyGuard from "../leader-or-captain-guard/LeaderOrCaptainOnlyGuard";
import PartyMemberSearch from "./PartyMemberSearch";
import PartyManagementLoadingSkeleton from "./PartyManagementLoadingSkeleton";
import InviteMemberForm from "./InviteMemberForm";

type PartyManagementModalProps = {
  isOpened: boolean;
  onClose: () => void;
  partyId: number;
  memberRole: number;
};

function PartyManagementModal({
  isOpened,
  onClose,
  partyId,
  memberRole,
}: PartyManagementModalProps) {
  const navigate = useNavigate({ from: Route.fullPath });

  const { data: partyMembers, isPending } = useGetPartyMembers(partyId);
  const leaveParty = useLeaveParty();

  const leavePartyHandler = async () => {
    await leaveParty.mutateAsync(Number(partyId));
    navigate({ to: "/parties", search: { pageNumber: 1 } });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isTransferOwnership, setIsTransferOwnership] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"currentLevel" | "username" | "role">(
    "username"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (!isOpened) {
      resetFilters();
    }
  }, [isOpened]);

  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("username");
    setSortOrder("asc");
  };

  if (!partyMembers) return null;

  const filteredMembers = partyMembers.filter((member) =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMembers = filteredMembers.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Separate the leader(s) and other members
  const partyLeaders = sortedMembers.filter(
    (member) => member.role === MEMBER_ROLES.LEADER
  );
  const otherMembers = sortedMembers.filter(
    (member) => member.role !== MEMBER_ROLES.LEADER
  );

  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Party Management">
      <Stack>
        {isTransferOwnership ? (
          <PartyLeaderManagementForm
            partyLeader={partyLeaders[0]}
            partyMembers={otherMembers}
            onCancel={() => setIsTransferOwnership(false)}
          />
        ) : isEditing ? (
          <PartyManagementForm
            partyMembers={otherMembers}
            onCancel={() => setIsEditing(false)}
            partyId={partyId}
          />
        ) : (
          <>
            {/* Search and Sort */}
            <LeaderOrCaptainOnlyGuard memberRole={memberRole}>
              <InviteMemberForm partyId={partyId} />
            </LeaderOrCaptainOnlyGuard>
            <PartyMemberSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              resetFilters={resetFilters}
            />

            {isPending ? (
              <PartyManagementLoadingSkeleton />
            ) : (
              <>
                {partyLeaders ? (
                  <PartyMemberDetail partyMembers={partyLeaders} />
                ) : (
                  <Paper p={16} w="100%" withBorder bg="secondary">
                    <Text ta="center">No Party Leader</Text>
                  </Paper>
                )}

                {partyMembers.length > 1 ? (
                  <PartyMemberDetail partyMembers={otherMembers} />
                ) : (
                  <Paper p={16} w="100%" withBorder bg="secondary">
                    <Text ta="center">No Party Members</Text>
                  </Paper>
                )}
              </>
            )}

            {/* Action Buttons */}
            <Flex justify="space-between" align="center" w="100%">
              {partyMembers.length > 1 ? (
                <Group gap={8}>
                  <LeaderOrCaptainOnlyGuard memberRole={memberRole}>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="light"
                      color="violet"
                    >
                      Manage Party Members
                    </Button>
                  </LeaderOrCaptainOnlyGuard>
                  <PartyLeaderRequiredGuard memberRole={memberRole}>
                    <Button
                      onClick={() => setIsTransferOwnership(true)}
                      variant="light"
                      color="violet"
                    >
                      Transfer Ownership
                    </Button>
                  </PartyLeaderRequiredGuard>
                </Group>
              ) : (
                <Group />
              )}
              <Button variant="light" color="red" onClick={leavePartyHandler}>
                Leave Party
              </Button>
            </Flex>
          </>
        )}
      </Stack>
    </PartyModal>
  );
}

export default PartyManagementModal;
