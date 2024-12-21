import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { QueryParams } from "../../../../shared/types";
import {
  PaginatedParties,
  Party,
  UpdateParty,
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
  updatedPartyDetails: UpdateParty
): Promise<Party> => {
  const response = (
    await apiClient.put(
      `${endpoints.parties}/${partyId}/details`,
      updatedPartyDetails
    )
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

export default {
  getAllParties,
  getRecentParties,
  getPartyById,
  createParty,
  updateParty,
  updatePartyCreator,
  deleteParty,
};
