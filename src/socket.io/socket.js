import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_SERVER_URL, {
  autoConnect: false,
  transports: ['websocket'],
});
