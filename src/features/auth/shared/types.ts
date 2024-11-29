import { z } from "zod";
import { loginSchema, registerSchema } from "./schema";

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export type User = {
	id: string;
	username: string;
	currentLevel: number;
	currentExp: number;
	expToNextLevel: number;
	avatar: UserAvatar;
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

export type LoginResponse = {
	tokens: Tokens;
	user: User;
};

export type AuthenticatedUser = User & {
	isLoggedIn: boolean;
};

export type StoredUser = {
	user: AuthenticatedUser;
	tokens: Tokens;
};
