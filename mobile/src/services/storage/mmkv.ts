import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  getString: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  set: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  delete: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clearAll: async () => {
    await AsyncStorage.clear();
  },
};

/**
 * Type-safe storage wrapper
 */
export const secureStorage = {
  // String storage
  setString: (key: string, value: string) => storage.set(key, value),
  getString: (key: string) => storage.getString(key),

  // Number storage
  setNumber: (key: string, value: number) => storage.set(key, value),
  getNumber: (key: string) => storage.getNumber(key),

  // Boolean storage
  setBoolean: (key: string, value: boolean) => storage.set(key, value),
  getBoolean: (key: string) => storage.getBoolean(key),

  // JSON storage
  setJSON: <T>(key: string, value: T) => storage.set(key, JSON.stringify(value)),
  getJSON: <T>(key: string): T | null => {
    const value = storage.getString(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  // Delete
  delete: (key: string) => storage.delete(key),

  // Clear all
  clearAll: () => storage.clearAll(),

  // Check if key exists
  contains: (key: string) => storage.contains(key),
};
