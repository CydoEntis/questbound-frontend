import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import partyService, { ChangeLeader } from "./services/party.service";
import { useMemo } from "react";
import { QueryParams } from "../../../shared/types";
import { NewParty, PartyData } from "../shared/party.types";
import { notifications } from "@mantine/notifications";
import { MemberUpdate } from "../../party-member/shared/party-members.types";

export const useGetParties = (queryParams: QueryParams) => {
  const memoizedQueryParams = useMemo(() => queryParams, [queryParams]);

  return useQuery({
    queryKey: ["parties", "list", memoizedQueryParams],
    queryFn: () => partyService.getAllParties(queryParams),
  });
};

export const useGetPartyDetails = (
  id: number,
  { enabled }: { enabled: boolean }
) => {
  return useQuery({
    queryKey: ["parties", "detail", id],
    queryFn: () => partyService.getPartyById(id),
    enabled,
  });
};

export const useGetRecentParties = () => {
  return useQuery({
    queryKey: ["parties", "recent"],
    queryFn: () => partyService.getRecentParties(),
  });
};

export function useCreateParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newParty: PartyData): Promise<NewParty> => {
      return await partyService.createParty(newParty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Created Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Party Creation Failed",
        message: "Party could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export type UpdatePartyPayload = {
  partyId: number;
  updatedParty: PartyData;
};

export function useUpdateParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      partyId,
      updatedParty,
    }: UpdatePartyPayload): Promise<number> => {
      return await partyService.updateParty(partyId, updatedParty);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "detail", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Updated Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Party Update Failed",
        message: "Party could not be updated.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useDeleteParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (partyId: number): Promise<number> => {
      return await partyService.deleteParty(partyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Deleted Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Party Deletion Failed",
        message: "Party could not be deleted.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useLeaveParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (partyId: number): Promise<number> => {
      return await partyService.leaveParty(partyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Left Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Leaving Party Failed",
        message: "Party could not be left.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export const useGetPartyMembers = (partyId: number) => {
  return useQuery({
    queryKey: ["party-members", partyId],
    queryFn: () => partyService.getPartyMembers(partyId),
    enabled: !!partyId,
  });
};

export function useUpdatePartyLeader() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      partyId,
      data,
    }: {
      partyId: number;
      data: ChangeLeader;
    }): Promise<number> => {
      return await partyService.updatePartyLeader(partyId, data);
    },
    onSuccess: (partyId) => {
      queryClient.invalidateQueries({ queryKey: ["party", "details"] });
      queryClient.invalidateQueries({ queryKey: ["party-members", partyId] });
      queryClient.invalidateQueries({
        queryKey: ["parties", "detail", partyId],
      });

      notifications.show({
        title: "Success",
        message: "Party leader updated successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update the party leader.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useUpdatePartyMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      partyId,
      members,
    }: {
      partyId: number;
      members: MemberUpdate[];
    }): Promise<number> => {
      return await partyService.updatePartyMembers(partyId, members);
    },
    onSuccess: (partyId: number) => {
      queryClient.invalidateQueries({ queryKey: ["party", "details"] });
      queryClient.invalidateQueries({ queryKey: ["party-members", partyId] });
      queryClient.invalidateQueries({
        queryKey: ["parties", "detail", partyId],
      });

      notifications.show({
        title: "Success",
        message: "Party members updated successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update party members.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useInviteMember() {
  return useMutation({
    mutationFn: partyService.inviteMemberToParty,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Invitation sent successfully!",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to send invitation.",
        color: "red",
      });
    },
  });
}