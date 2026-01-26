import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  colors: {
    background: string;
    foreground: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    destructive: string;
    muted: string;
    success: string;
  };
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = '@rize_theme';

const lightColors = {
  background: '#FFFFFF',
  foreground: '#FAFAFA',
  card: '#FFFFFF',
  text: '#09090B',
  textSecondary: '#71717A',
  border: '#E4E4E7',
  primary: '#10B981',
  primaryForeground: '#FFFFFF',
  secondary: '#F4F4F5',
  accent: '#3B82F6',
  destructive: '#EF4444',
  muted: '#F4F4F5',
  success: '#10B981',
};

const darkColors = {
  background: '#09090B',
  foreground: '#18181B',
  card: '#18181B',
  text: '#FAFAFA',
  textSecondary: '#A1A1AA',
  border: '#27272A',
  primary: '#10B981',
  primaryForeground: '#FFFFFF',
  secondary: '#27272A',
  accent: '#3B82F6',
  destructive: '#EF4444',
  muted: '#27272A',
  success: '#10B981',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    // Load saved theme
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const isDark =
    theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');

  const value: ThemeContextValue = {
    theme,
    setTheme,
    isDark,
    colors: isDark ? darkColors : lightColors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
