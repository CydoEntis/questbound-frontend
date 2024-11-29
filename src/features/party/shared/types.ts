export type Party = {
	id: number;
	title: string;
	description: string;
	creatorId: string;
	creator: string;
	// color: Color;
	members: Member[];
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
	// questStats: QuestStats;
	currentUserRole: string;
};

export type PaginatedParties = {
	items: Party[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	pageRange: number[];
};

export type CreateParty = {
	title: string;
	description: string;
	dueDate: Date;
};

export type UpdateParty = {
	id: number;
	title: string;
	description: string;
	dueDate: Date;
};

export type UpdatePartyLeader = {
	partyId: number;
	userId: string;
};

export type NewPartyCreator = {
	partyId: number;
	memberId: number;
};
