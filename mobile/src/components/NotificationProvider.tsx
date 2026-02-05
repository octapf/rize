import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useAuthStore } from '@/stores/authStore';
import {
  registerForPushNotificationsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from '@/lib/notifications';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    if (user) {
      // Register for push notifications
      registerForPushNotificationsAsync();

      // Listen for notifications while app is open
      notificationListener.current = addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
        // Optionally show in-app notification
      });

      // Handle notification tap
      responseListener.current = addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        // Navigate based on notification type
        if (data.type === 'friend_request') {
          router.push('/friends' as any);
        } else if (data.type === 'message' && data.userId) {
          router.push(`/chat/${data.userId}` as any);
        } else if (data.type === 'workout_like' || data.type === 'comment') {
          router.push('/social/feed');
        } else if (data.type === 'achievement') {
          router.push('/achievements');
        } else if (data.type === 'challenge') {
          router.push('/challenges');
        }
      });

      return () => {
        // removeNotificationSubscription is only available on native platforms
        if (Platform.OS !== 'web') {
          if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current);
          }
          if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current);
          }
        }
      };
    }
  }, [user]);

  return <>{children}</>;
}
