/**
 * Listens for network status and flushes the offline sync queue when back online.
 * Call loadQueue() on app init so pending items are available after restart.
 */
import { useEffect, useRef } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useSyncStore } from '@/stores/syncStore';

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const loadQueue = useSyncStore((s) => s.loadQueue);
  const flushQueue = useSyncStore((s) => s.flushQueue);
  const wasOffline = useRef<boolean | null>(null);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const isConnected = state.isConnected ?? false;

      if (wasOffline.current === true && isConnected) {
        flushQueue();
      }
      wasOffline.current = !isConnected;
    });

    // If we're already online on mount and have pending items, flush once
    NetInfo.fetch().then((state) => {
      if (state.isConnected && useSyncStore.getState().queue.length > 0) {
        flushQueue();
      }
    });

    return () => unsubscribe();
  }, [flushQueue]);

  return <>{children}</>;
}
