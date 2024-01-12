import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_SERVER_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
