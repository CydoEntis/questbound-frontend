import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { NewQuest } from "../../shared/quest.types";

const createQuest = async (newQuest: NewQuest): Promise<void> => {
  const response = (await apiClient.post(`${endpoints.quests}`, newQuest)).data;
  if (!response.isSuccess) throw new Error();

  return response.result;
};

export default { createQuest };
