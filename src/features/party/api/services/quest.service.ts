import apiClient from "../../../../api/apiClient";
import endpoints from "../../../../api/endpoints";
import { QueryParams } from "../../../../shared/types";
import {
  NewQuest,
  PaginatedComments,
  PaginatedQuests,
  QuestDetail,
  QuestStepUpdate,
  UpdateQuest,
} from "../../shared/quest.types";

const createQuest = async (newQuest: NewQuest): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.parties}/quests`, newQuest)
  ).data;
  if (!response.success) throw new Error();

  return response.data;
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

  console.log(response);

  if (!response.success) throw new Error();
  return response.data;
};

const getQuestDetails = async (questId: number): Promise<QuestDetail> => {
  const response = (
    await apiClient.get(`${endpoints.parties}/quests/${questId}`)
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const updateStepStatus = async (
  questStep: QuestStepUpdate
): Promise<number> => {
  console.log(questStep);
  const response = (await apiClient.put(`${endpoints.steps}`, questStep)).data;

  if (!response.success) throw new Error();
  return response.data;
};

const completeQuest = async (questId: number): Promise<number> => {
  const response = (
    await apiClient.put(`${endpoints.parties}/quests/${questId}/complete`)
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const updateQuest = async (
  questId: number,
  updateQuest: UpdateQuest
): Promise<number> => {
  const response = (
    await apiClient.put(`${endpoints.parties}/quests/${questId}`, updateQuest)
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const deleteQuest = async (questId: number): Promise<number> => {
  const response = (
    await apiClient.delete(`${endpoints.parties}/quests/${questId}`)
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const getPaginatedComments = async (
  questId: number,
  params?: QueryParams
): Promise<PaginatedComments> => {
  const queryParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = (
    await apiClient.get(
      `${endpoints.parties}/quests/${questId}/comments?${queryParams.toString()}`
    )
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const addComment = async (
  questId: number,
  content: string
): Promise<number> => {
  const response = (
    await apiClient.post(`${endpoints.parties}/quests/${questId}/comments`, {
      content,
    })
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const editComment = async (
  questId: number,
  commentId: number,
  content: string
): Promise<number> => {
  const response = (
    await apiClient.put(
      `${endpoints.parties}/quests/${questId}/comments/${commentId}`,
      { content }
    )
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

const deleteComment = async (
  questId: number,
  commentId: number
): Promise<number> => {
  const response = (
    await apiClient.delete(
      `${endpoints.parties}/quests/${questId}/comments/${commentId}`
    )
  ).data;

  if (!response.success) throw new Error();
  return response.data;
};

export default {
  createQuest,
  getPartyQuests,
  getQuestDetails,
  updateStepStatus,
  completeQuest,
  updateQuest,
  deleteQuest,
  getPaginatedComments,
  addComment,
  editComment,
  deleteComment,
};
