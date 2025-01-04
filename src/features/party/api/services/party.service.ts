import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { QueryParams } from "../../../../shared/types";
import {
  ChangeLeader,
  MemberUpdate,
  PartyMember,
  UpdatePartyMemberResponse,
} from "../../../party-member/shared/party-members.types";
import {
  PaginatedParties,
  Party,
  NewPartyCreator,
  PartyData,
  PartyModifiedResponse,
} from "../../shared/party.types";

const getAllParties = async (
  params?: QueryParams
): Promise<PaginatedParties> => {
  const queryParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = (
    await apiClient.get(`${endpoints.parties}?${queryParams.toString()}`)
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const getRecentParties = async (): Promise<Party[]> => {
  const response = (await apiClient.get(`${endpoints.parties}/recent`)).data;

  if (!response.success) throw new Error();
  return response.data;
};

const getPartyById = async (partyId: number): Promise<Party> => {
  const response = (await apiClient.get(`${endpoints.parties}/${partyId}`))
    .data;
  if (!response.success) throw new Error();
  return response.data;
};

const createParty = async (party: PartyData): Promise<Party> => {
  const response = (await apiClient.post(`${endpoints.parties}`, party)).data;
  if (!response.success) throw new Error();

  return response.data;
};

const updateParty = async (
  partyId: number,
  updatedPartyDetails: PartyData
): Promise<PartyModifiedResponse> => {
  const response = (
    await apiClient.put(`${endpoints.parties}/${partyId}`, updatedPartyDetails)
  ).data;
  if (!response.success) throw new Error();

  return response.data;
};

const updatePartyCreator = async (
  newPartyCreator: NewPartyCreator
): Promise<Party> => {
  const response = (
    await apiClient.put(
      `${endpoints.parties}/${newPartyCreator.partyId}/change-creator`,
      newPartyCreator
    )
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

const deleteParty = async (partyId: number): Promise<PartyModifiedResponse> => {
  const response = (await apiClient.delete(`${endpoints.parties}/${partyId}`))
    .data;
  if (!response.success) throw new Error();

  return response.data;
};

const leaveParty = async (partyId: number): Promise<number> => {
  const response = (
    await apiClient.delete(`${endpoints.partyMembers}/${partyId}/leave`)
  ).data;
  if (!response.success) throw new Error();

  return response.data;
};

const getPartyMembers = async (partyId: number): Promise<PartyMember[]> => {
  const response = (await apiClient.get(`${endpoints.partyMembers}/${partyId}`))
    .data;

  if (!response.success) throw new Error();

  return response.data;
};

const updatePartyLeader = async (
  partyId: number,
  data: ChangeLeader
): Promise<UpdatePartyMemberResponse> => {
  try {
    const response = (
      await apiClient.put(
        `${endpoints.partyMembers}/${partyId}/change-leader`,
        data
      )
    ).data;

    if (!response.success) {
      console.error("Error updating party leader:", response.errors);
      throw new Error("Failed to update the party leader.");
    }

    return response.data;
  } catch (error) {
    console.error("An error occurred while updating the party leader:", error);
    throw error;
  }
};

const updatePartyMembers = async (
  partyId: number,
  members: MemberUpdate[]
): Promise<UpdatePartyMemberResponse> => {
  const response = (
    await apiClient.put(`${endpoints.partyMembers}/${partyId}/members`, members)
  ).data;
  if (!response.success) throw new Error("Failed to update party members.");

  return response.data;
};

const inviteMemberToParty = async ({
  partyId,
  email,
}: {
  partyId: number;
  email: string;
}): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.partyMembers}/${partyId}/invite`, {
      inviteeEMail: email,
    })
  ).data;

  if (!response.success) {
    throw new Error(response.errors?.join(", ") || "Failed to send invitation");
  }
};

const acceptInvite = async (token: string): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.partyMembers}/accept-invite`, { token })
  ).data;

  if (!response.success) {
    throw new Error(
      response.errors?.join(", ") || "Failed to accept the invitation"
    );
  }

};

export default {
  getAllParties,
  getRecentParties,
  getPartyById,
  createParty,
  updateParty,
  updatePartyCreator,
  deleteParty,
  leaveParty,
  getPartyMembers,
  updatePartyLeader,
  updatePartyMembers,
  inviteMemberToParty,
  acceptInvite
};
