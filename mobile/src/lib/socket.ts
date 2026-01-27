import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/authStore';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      console.log('No token available, skipping socket connection');
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log('Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Chat events
  joinChat(chatId: string) {
    this.socket?.emit('join_chat', { chatId });
  }

  leaveChat(chatId: string) {
    this.socket?.emit('leave_chat', { chatId });
  }

  sendMessage(chatId: string, message: any) {
    this.socket?.emit('send_message', { chatId, message });
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket?.on('new_message', callback);
  }

  onMessageRead(callback: (data: { messageId: string; readBy: string }) => void) {
    this.socket?.on('message_read', callback);
  }

  onTyping(callback: (data: { userId: string; isTyping: boolean }) => void) {
    this.socket?.on('typing', callback);
  }

  emitTyping(chatId: string, isTyping: boolean) {
    this.socket?.emit('typing', { chatId, isTyping });
  }

  // User presence
  onUserOnline(callback: (userId: string) => void) {
    this.socket?.on('user_online', callback);
  }

  onUserOffline(callback: (userId: string) => void) {
    this.socket?.on('user_offline', callback);
  }

  // Workout events
  onWorkoutStarted(callback: (data: any) => void) {
    this.socket?.on('workout_started', callback);
  }

  onWorkoutCompleted(callback: (data: any) => void) {
    this.socket?.on('workout_completed', callback);
  }

  // Challenge events
  joinChallenge(challengeId: string) {
    this.socket?.emit('join_challenge', { challengeId });
  }

  onChallengeUpdate(callback: (data: any) => void) {
    this.socket?.on('challenge_update', callback);
  }

  // Generic emit
  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  // Generic listener
  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
