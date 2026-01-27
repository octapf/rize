import { useState, useEffect } from 'react';
import { settingsService, AppSettings } from '@/services/settings.service';

/**
 * Hook to get and update app settings
 */
export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const loadedSettings = await settingsService.getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    try {
      await settingsService.setSetting(key, value);
      setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  };

  const resetAllSettings = async () => {
    try {
      await settingsService.resetSettings();
      await loadSettings();
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  };

  return {
    settings,
    isLoading,
    updateSetting,
    resetAllSettings,
    reloadSettings: loadSettings,
  };
};

/**
 * Hook to get a single setting value
 */
export const useSetting = <K extends keyof AppSettings>(key: K) => {
  const [value, setValue] = useState<AppSettings[K] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    setIsLoading(true);
    try {
      const settingValue = await settingsService.getSetting(key);
      setValue(settingValue);
    } catch (error) {
      console.error(`Error loading setting ${key}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateValue = async (newValue: AppSettings[K]) => {
    try {
      await settingsService.setSetting(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error(`Error updating setting ${key}:`, error);
      throw error;
    }
  };

  return {
    value,
    isLoading,
    updateValue,
    reloadValue: loadValue,
  };
};
