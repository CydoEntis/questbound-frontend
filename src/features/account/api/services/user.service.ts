import apiClient from "../../../../lib/api/apiClient";
import endpoints from "../../../../lib/api/endpoints";
import { UpdateUserRequest, UpdateUserResponse } from "../../shared/types";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  updateUserDetails,
};
