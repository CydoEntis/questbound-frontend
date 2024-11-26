import { Tokens } from "./auth.types";
import { UserAvatar } from "./avatar.types";

export type User = {
	id: string;
	username: string;
	currentLevel: number;
	currentExp: number;
	expToNextLevel: number;
	avatar: UserAvatar;
	tokens: Tokens;
}