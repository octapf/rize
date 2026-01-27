import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { socketService } from '@/lib/socket';

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (user && token) {
      // Connect to socket server
      socketService.connect();

      // Cleanup on unmount
      return () => {
        socketService.disconnect();
      };
    }
  }, [user, token]);

  return <>{children}</>;
}
