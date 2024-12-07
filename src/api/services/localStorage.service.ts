const LocalStorageService = {
  /**
   * Save an item to local storage.
   * @param key - The key to save the data under.
   * @param value - The value to save. Must be serializable to JSON.
   */
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Retrieve an item from local storage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed value or null if the key does not exist or parsing fails.
   */
  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(
        `Failed to parse localStorage item for key: "${key}"`,
        error
      );
      return null;
    }
  },

  /**
   * Remove an item from local storage.
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * Clear all items from local storage.
   */
  clearStorage(): void {
    localStorage.clear();
  },

  /**
   * Update an existing item in local storage.
   * If the item does not exist, it will be created with the provided updates.
   * @param key - The key of the item to update.
   * @param updates - The updates to merge into the existing value.
   */
  updateItem(key: string, updates: Record<string, any>): void {
    const currentData = this.getItem<Record<string, any>>(key) || {};
    const updatedData = { ...currentData, ...updates };
    this.setItem(key, updatedData);
  },

  /**
   * Update the user's avatar in local storage.
   * @param key - The key where user data is stored (e.g., "questbound").
   * @param avatar - The new avatar object to set.
   */
  updateUserAvatar(key: string, avatar: { id: number; name: string; displayName: string; imageUrl: string }): void {
    const currentUser = this.getItem<Record<string, any>>(key);
    if (currentUser && currentUser.user) {
      currentUser.user.avatar = avatar;
      this.setItem(key, currentUser);
    } else {
      console.warn(`User data not found under key "${key}". Unable to update avatar.`);
    }
  },
};

export default LocalStorageService;
