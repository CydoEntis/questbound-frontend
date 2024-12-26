import PartyModal from "../party-modals/PartyModal";
import { useGetPartyMembers, useLeaveParty } from "../../../api/party";
import { MEMBER_ROLES } from "../../../../../shared/utils/constants";
import PartyManagementForm from "./PartyManagementForm";
import PartyLeaderManagementForm from "./PartyLeaderManagementForm";
import { useState, useEffect } from "react";
import {
  Stack,
  TextInput,
  Select,
  Flex,
  Button,
  ActionIcon,
  Group,
} from "@mantine/core";
import PartyMemberDetail from "../party-member-details/PartyMemberDetail";
import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../../../../routes/_authenticated/parties";
import PartyLeaderRequiredGuard from "../party-leader-required/PartyLeaderRequiredGuard";
import LeaderOrCaptainOnlyGuard from "../leader-or-captain-guard/LeaderOrCaptainOnlyGuard";

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

  const { data: partyMembers } = useGetPartyMembers(partyId);
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

  // Reset filters when modal is closed
  useEffect(() => {
    if (!isOpened) {
      resetFilters();
    }
  }, [isOpened]);

  // Reset filters function
  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("username");
    setSortOrder("asc");
  };

  if (!partyMembers) return null;

  // Filter party members by search query
  const filteredMembers = partyMembers.filter((member) =>
    member.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort party members by selected criteria and order
  const sortedMembers = filteredMembers.sort((a, b) => {
    const valueA = a[sortBy]; // Access the property directly
    const valueB = b[sortBy]; // Access the property directly

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
            {/* Search and Filter Section */}
            <Flex gap={8} align="end" mb="sm" w="100%">
              <TextInput
                classNames={{
                  input: "input",
                }}
                label="Search"
                placeholder="Search by username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                w="40%"
              />

              <Select
                classNames={{
                  input: "input",
                }}
                label="Sort By"
                value={sortBy}
                onChange={(value) =>
                  setSortBy(value as "currentLevel" | "username" | "role")
                }
                data={[
                  { label: "Username", value: "username" },
                  { label: "Level", value: "currentLevel" },
                  { label: "Role", value: "role" },
                ]}
              />
              <Select
                classNames={{
                  input: "input",
                }}
                label="Sort Order"
                value={sortOrder}
                onChange={(value) => setSortOrder(value as "asc" | "desc")}
                data={[
                  { label: "Ascending", value: "asc" },
                  { label: "Descending", value: "desc" },
                ]}
              />
              <ActionIcon
                onClick={resetFilters}
                variant="light"
                color="red"
                size="lg"
                mb={1}
              >
                <X size={20} />
              </ActionIcon>
            </Flex>

            {/* Party Member Details */}
            <PartyMemberDetail partyMembers={partyLeaders} />
            <PartyMemberDetail partyMembers={otherMembers} />

            {/* Action Buttons */}
            <Flex justify="space-between" align="center" w="100%">
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
