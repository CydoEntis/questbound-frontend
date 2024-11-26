import { z } from "zod";
import { loginCredentials, registerCredentials } from "./schema";

export type LoginCredentials = z.infer<typeof loginCredentials>;
export type RegisterCredentials = z.infer<typeof registerCredentials>;

export type User = {
	id: string;
	username: string;
	currentLevel: number;
	currentExp: number;
	expToNextLevel: number;
	avatar: UserAvatar;
	isLoggedIn: boolean;
};

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

export type UserAvatar = {
	name: string;
	displayName: string;
	imageUrl: string;
};

export type AuthResponse = {
	tokens: Tokens;
	user: User;
};

export type AuthenticatedUser = User & {
	isLoggedIn: boolean;
};
