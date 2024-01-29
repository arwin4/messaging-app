import { io } from 'socket.io-client';
import getCurrentUser from '../utils/getCurrentUser';

const currentUser = getCurrentUser();

const socket = io(`${import.meta.env.VITE_API_SERVER_URL}/user`, {
  autoConnect: false,
  transports: ['websocket'],
  auth: { token: currentUser._id },
});

export default socket;
