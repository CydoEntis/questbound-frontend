export const baseUrl = import.meta.env.VITE_API_URL;

const endpoints = {
	auth: "/auth",
	user: "/user",
	avatars: "/avatars",
	parties: "/parties",
	partyMembers: "/party-members",
	quests: "/quests",
	steps: "/steps",
};

export default endpoints;
