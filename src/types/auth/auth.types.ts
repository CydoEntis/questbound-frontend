export type Tokens = {
	accessToken: string;
	refreshToken: string;
}

export type LoginCredentials = {
	email: string;
	password: string;
}

export type RegisterCredentials = {
	email: string;
	username: string;
	avatarId: number;
	password: string;
}