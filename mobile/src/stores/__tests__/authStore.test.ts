import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';
import { storage } from '@/services/storage/mmkv';

// Mock the storage module
jest.mock('@/services/storage/mmkv', () => ({
  storage: {
    set: jest.fn(),
    getString: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('AuthStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset store state
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('setAuth', () => {
    it('should set authentication data', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockAuthData = {
        user: {
          id: '123',
          email: 'test@example.com',
          username: 'testuser',
          xp: 100,
          level: 5,
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 900,
      };

      await act(async () => {
        await result.current.setAuth(mockAuthData);
      });

      expect(storage.set).toHaveBeenCalledWith('accessToken', mockAuthData.accessToken);
      expect(storage.set).toHaveBeenCalledWith('refreshToken', mockAuthData.refreshToken);
      expect(storage.set).toHaveBeenCalledWith('user', JSON.stringify(mockAuthData.user));
      
      expect(result.current.user).toEqual(mockAuthData.user);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('setUser', () => {
    it('should update user data', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser = {
        id: '123',
        email: 'updated@example.com',
        username: 'updateduser',
        xp: 200,
        level: 10,
      };

      await act(async () => {
        await result.current.setUser(mockUser);
      });

      expect(storage.set).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
      expect(result.current.user).toEqual(mockUser);
    });
  });

  describe('logout', () => {
    it('should clear authentication data', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      // First set some auth data
      const mockAuthData = {
        user: {
          id: '123',
          email: 'test@example.com',
          username: 'testuser',
          xp: 100,
          level: 5,
        },
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresIn: 900,
      };

      await act(async () => {
        await result.current.setAuth(mockAuthData);
      });

      // Then logout
      await act(async () => {
        await result.current.logout();
      });

      expect(storage.delete).toHaveBeenCalledWith('accessToken');
      expect(storage.delete).toHaveBeenCalledWith('refreshToken');
      expect(storage.delete).toHaveBeenCalledWith('user');
      
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('initAuth', () => {
    it('should initialize auth state from storage when tokens exist', async () => {
      const mockUser = {
        id: '123',
        email: 'stored@example.com',
        username: 'storeduser',
        xp: 150,
        level: 7,
      };

      (storage.getString as jest.Mock).mockImplementation((key: string) => {
        if (key === 'user') return JSON.stringify(mockUser);
        if (key === 'accessToken') return 'stored-token';
        return null;
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initAuth();
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should not authenticate when no tokens in storage', async () => {
      (storage.getString as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initAuth();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle invalid JSON in storage gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      (storage.getString as jest.Mock).mockImplementation((key: string) => {
        if (key === 'user') return 'invalid-json{';
        if (key === 'accessToken') return 'token';
        return null;
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initAuth();
      });

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('State Persistence', () => {
    it('should persist state across multiple operations', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockAuthData = {
        user: {
          id: '123',
          email: 'test@example.com',
          username: 'testuser',
          xp: 100,
          level: 5,
        },
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresIn: 900,
      };

      // Set auth
      await act(async () => {
        await result.current.setAuth(mockAuthData);
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Update user
      const updatedUser = { ...mockAuthData.user, xp: 200, level: 6 };
      await act(async () => {
        await result.current.setUser(updatedUser);
      });

      expect(result.current.user?.xp).toBe(200);
      expect(result.current.user?.level).toBe(6);
      expect(result.current.isAuthenticated).toBe(true);

      // Logout
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });
});
