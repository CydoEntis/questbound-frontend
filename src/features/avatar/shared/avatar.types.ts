export type UserAvatar = {
  id: number;
  name: string;
  displayName: string;
  imageUrl: string;
};


export type UnlockableAvatar = {
  id: number;
  name: string;
  displayName: string;
  imageUrl: string;
  unlockLevel: number;
  unlockCost: number;
  tier: number;
  isUnlocked: boolean;
};
