import apiClient from "../../../../lib/api/apiClient";
import endpoints from "../../../../lib/api/endpoints";
import { QueryParams } from "../../../../shared/types/types";
import {
	PaginatedParties,
	Party,
	CreateParty,
	UpdateParty,
	NewPartyCreator,
} from "../../shared/types";

const getAllParties = async (
	params?: QueryParams,
): Promise<PaginatedParties> => {
	const queryParams = new URLSearchParams();

	Object.entries(params || {}).forEach(([key, value]) => {
		if (value) queryParams.append(key, value.toString());
	});

	const response = (
		await apiClient.get(`${endpoints.userParties}?${queryParams.toString()}`)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getPartyById = async (partyId: number): Promise<Party> => {
	const response = (await apiClient.get(`${endpoints.userParties}/${partyId}`))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createParty = async (party: CreateParty): Promise<Party> => {
	const response = (await apiClient.post(`${endpoints.userParties}`, party))
		.data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateParty = async (
	partyId: number,
	updatedPartyDetails: UpdateParty,
): Promise<Party> => {
	const response = (
		await apiClient.put(
			`${endpoints.userParties}/${partyId}/details`,
			updatedPartyDetails,
		)
	).data;
	if (!response.isSuccess) throw new Error();

	console.log(response.result);

	return response.result;
};

const updatePartyCreator = async (
	newPartyCreator: NewPartyCreator,
): Promise<Party> => {
	const response = (
		await apiClient.put(
			`${endpoints.userParties}/${newPartyCreator.partyId}/change-creator`,
			newPartyCreator,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteParty = async (partyId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.userParties}/${partyId}`)
	).data;
	if (!response.isSuccess) throw new Error();
};

export default {
	getAllParties,
	getPartyById,
	createParty,
	updateParty,
	updatePartyCreator,
	deleteParty,
};
