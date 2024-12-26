import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { QueryParams } from "../../../../shared/types";
import {
  MemberUpdate,
  PartyMember,
} from "../../../party-member/shared/party-members.types";
import {
  PaginatedParties,
  Party,
  NewPartyCreator,
  PartyData,
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

  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getRecentParties = async (): Promise<Party[]> => {
  const response = (await apiClient.get(`${endpoints.parties}/recent`)).data;

  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getPartyById = async (partyId: number): Promise<Party> => {
  const response = (await apiClient.get(`${endpoints.parties}/${partyId}`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const createParty = async (party: PartyData): Promise<Party> => {
  const response = (await apiClient.post(`${endpoints.parties}`, party)).data;
  if (!response.isSuccess) throw new Error();

  return response.result;
};

const updateParty = async (
  partyId: number,
  updatedPartyDetails: PartyData
): Promise<number> => {
  const response = (
    await apiClient.put(`${endpoints.parties}/${partyId}`, updatedPartyDetails)
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
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
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const deleteParty = async (partyId: number): Promise<number> => {
  const response = (await apiClient.delete(`${endpoints.parties}/${partyId}`))
    .data;
  if (!response.isSuccess) throw new Error();

  return response.data;
};

const leaveParty = async (partyId: number): Promise<number> => {
  const response = (
    await apiClient.delete(`${endpoints.partyMembers}/${partyId}/leave`)
  ).data;
  if (!response.isSuccess) throw new Error();

  return response.data;
};

const getPartyMembers = async (partyId: number): Promise<PartyMember[]> => {
  const response = (await apiClient.get(`${endpoints.partyMembers}/${partyId}`))
    .data;

  console.log(response);
  if (!response.isSuccess) throw new Error();

  return response.result;
};

export type ChangeLeader = {
  currentLeaderId: string;
  newLeaderId: string;
  newRoleForPreviousLeader: number;
};

const updatePartyLeader = async (
  partyId: number,
  data: ChangeLeader
): Promise<number> => {
  try {
    const response = (
      await apiClient.put(
        `${endpoints.partyMembers}/${partyId}/change-leader`,
        data
      )
    ).data;

    if (!response.isSuccess) {
      console.error("Error updating party leader:", response.errors);
      throw new Error("Failed to update the party leader.");
    }

    return response.result;
  } catch (error) {
    console.error("An error occurred while updating the party leader:", error);
    throw error;
  }
};

const updatePartyMembers = async (
  partyId: number,
  members: MemberUpdate[]
): Promise<number> => {
  const response = (
    await apiClient.put(`${endpoints.partyMembers}/${partyId}/members`, members)
  ).data;
  if (!response.isSuccess) throw new Error("Failed to update party members.");

  return response.result;
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
};
