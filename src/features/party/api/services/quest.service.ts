import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { NewQuest, Quest } from "../../shared/quest.types";

const createQuest = async (newQuest: NewQuest): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.parties}/quests`, newQuest)
  ).data;
  if (!response.isSuccess) throw new Error();

  return response.result;
};

const getPartyQuests = async (partyId: number): Promise<Quest[]> => {
  const response = (
    await apiClient.get(`${endpoints.parties}/${partyId}/quests`)
  ).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default { createQuest, getPartyQuests };
