import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { QueryParams } from "../../../../shared/types";
import {
  NewQuest,
  PaginatedQuests,
  QuestDetail,
} from "../../shared/quest.types";

const createQuest = async (newQuest: NewQuest): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.parties}/quests`, newQuest)
  ).data;
  if (!response.isSuccess) throw new Error();

  return response.result;
};

const getPartyQuests = async (
  partyId: number,
  params?: QueryParams
): Promise<PaginatedQuests> => {
  const queryParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = (
    await apiClient.get(
      `${endpoints.parties}/${partyId}/quests?${queryParams.toString()}`
    )
  ).data;

  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getQuestDetails = async (questId: number): Promise<QuestDetail> => {
  const response = (
    await apiClient.get(`${endpoints.parties}/quests/${questId}`)
  ).data;

  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default { createQuest, getPartyQuests, getQuestDetails };
