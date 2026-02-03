import AsyncStorage from '@react-native-async-storage/async-storage';

export const SETTINGS_KEYS = {
  REST_TIMER_DEFAULT: '@settings_rest_timer_default',
  AUTO_START_REST_TIMER: '@settings_auto_start_rest_timer',
  NOTIFICATIONS_ENABLED: '@settings_notifications_enabled',
  NOTIFICATIONS_ACHIEVEMENTS: '@settings_notifications_achievements',
  NOTIFICATIONS_RECORDS: '@settings_notifications_records',
  NOTIFICATIONS_CHALLENGES: '@settings_notifications_challenges',
  NOTIFICATIONS_SOCIAL: '@settings_notifications_social',
  NOTIFICATIONS_REMINDERS: '@settings_notifications_reminders',
  SOUND_EFFECTS: '@settings_sound_effects',
  HAPTIC_FEEDBACK: '@settings_haptic_feedback',
} as const;

export interface AppSettings {
  restTimerDefault: number;
  autoStartRestTimer: boolean;
  notificationsEnabled: boolean;
  notificationsAchievements: boolean;
  notificationsRecords: boolean;
  notificationsChallenges: boolean;
  notificationsSocial: boolean;
  notificationsReminders: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  restTimerDefault: 90,
  autoStartRestTimer: true,
  notificationsEnabled: true,
  notificationsAchievements: true,
  notificationsRecords: true,
  notificationsChallenges: true,
  notificationsSocial: true,
  notificationsReminders: true,
  soundEffects: true,
  hapticFeedback: true,
};

class SettingsService {
  /**
   * Get all settings
   */
  async getSettings(): Promise<AppSettings> {
    try {
      const settings = await AsyncStorage.multiGet(Object.values(SETTINGS_KEYS));
      const parsedSettings: Partial<AppSettings> = {};

      settings.forEach(([key, value]) => {
        if (value === null) return;

        switch (key) {
          case SETTINGS_KEYS.REST_TIMER_DEFAULT:
            parsedSettings.restTimerDefault = parseInt(value);
            break;
          case SETTINGS_KEYS.AUTO_START_REST_TIMER:
            parsedSettings.autoStartRestTimer = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_ENABLED:
            parsedSettings.notificationsEnabled = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_ACHIEVEMENTS:
            parsedSettings.notificationsAchievements = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_RECORDS:
            parsedSettings.notificationsRecords = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_CHALLENGES:
            parsedSettings.notificationsChallenges = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_SOCIAL:
            parsedSettings.notificationsSocial = value === 'true';
            break;
          case SETTINGS_KEYS.NOTIFICATIONS_REMINDERS:
            parsedSettings.notificationsReminders = value === 'true';
            break;
          case SETTINGS_KEYS.SOUND_EFFECTS:
            parsedSettings.soundEffects = value === 'true';
            break;
          case SETTINGS_KEYS.HAPTIC_FEEDBACK:
            parsedSettings.hapticFeedback = value === 'true';
            break;
        }
      });

      return { ...DEFAULT_SETTINGS, ...parsedSettings };
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Get a specific setting
   */
  async getSetting<K extends keyof AppSettings>(
    key: K
  ): Promise<AppSettings[K]> {
    const settings = await this.getSettings();
    return settings[key];
  }

  /**
   * Set a specific setting
   */
  async setSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> {
    try {
      let storageKey: string;
      let storageValue: string;

      switch (key) {
        case 'restTimerDefault':
          storageKey = SETTINGS_KEYS.REST_TIMER_DEFAULT;
          storageValue = value.toString();
          break;
        case 'autoStartRestTimer':
          storageKey = SETTINGS_KEYS.AUTO_START_REST_TIMER;
          storageValue = value.toString();
          break;
        case 'notificationsEnabled':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_ENABLED;
          storageValue = value.toString();
          break;
        case 'notificationsAchievements':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_ACHIEVEMENTS;
          storageValue = value.toString();
          break;
        case 'notificationsRecords':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_RECORDS;
          storageValue = value.toString();
          break;
        case 'notificationsChallenges':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_CHALLENGES;
          storageValue = value.toString();
          break;
        case 'notificationsSocial':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_SOCIAL;
          storageValue = value.toString();
          break;
        case 'notificationsReminders':
          storageKey = SETTINGS_KEYS.NOTIFICATIONS_REMINDERS;
          storageValue = value.toString();
          break;
        case 'soundEffects':
          storageKey = SETTINGS_KEYS.SOUND_EFFECTS;
          storageValue = value.toString();
          break;
        case 'hapticFeedback':
          storageKey = SETTINGS_KEYS.HAPTIC_FEEDBACK;
          storageValue = value.toString();
          break;
        default:
          throw new Error(`Unknown setting key: ${key}`);
      }

      await AsyncStorage.setItem(storageKey, storageValue);
    } catch (error) {
      console.error('Error saving setting:', error);
      throw error;
    }
  }

  /**
   * Reset all settings to defaults
   */
  async resetSettings(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(SETTINGS_KEYS));
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }

  /**
   * Check if a notification type is enabled
   */
  async isNotificationTypeEnabled(
    type: 'achievements' | 'records' | 'challenges' | 'social' | 'reminders'
  ): Promise<boolean> {
    const settings = await this.getSettings();
    
    if (!settings.notificationsEnabled) {
      return false;
    }

    switch (type) {
      case 'achievements':
        return settings.notificationsAchievements;
      case 'records':
        return settings.notificationsRecords;
      case 'challenges':
        return settings.notificationsChallenges;
      case 'social':
        return settings.notificationsSocial;
      case 'reminders':
        return settings.notificationsReminders;
      default:
        return false;
    }
  }
}

export const settingsService = new SettingsService();
