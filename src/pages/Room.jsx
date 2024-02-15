import React, { useEffect, useState } from 'react';
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import getJwt from '@utils/getJwt';
import Messages from '@components/rooms/Messages';
import MessagesForm from '@components/rooms/MessageForm';
import Header from '@components/rooms/Header';
import socket from '../socket.io/socket';
import './style/Room.css';

/** == Room data fetching logic ==
 *
 * On initial load, the room object (which includes its messages) is fetched
 * using a loader and assigned to the 'room' variable.
 *
 * The socket.io instance receives subsequent changes to the room's member
 * array. The changed room object is fetched again; this time using useFetcher.
 * It is again assigned to the 'room' variable.
 *
 * New messages are received separately by the socket.io instance. (That
 * includes messages sent by the user.) The Messages component concatenates
 * these new messages with the ones fetched in the previous steps.
 *
 * Using the loader and fetcher in this way minimizes the amount of state
 * management necessary, reduces prop drilling and altogether avoids having to
 * implement a custom hook for fetching.
 */

export default function Room() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  const fetcher = useFetcher();

  // Use the most recent fetch
  const room = fetcher.data ? fetcher.data : loaderData;

  // When the socket receives a new message, it is pushed in this array
  const [socketMessages, setSocketMessages] = useState([]);

  // Socket
  useEffect(() => {
    socket.connect();

    // The handlers must be named, or they cannot be removed. Strict mode will
    // run the effect twice, so the handlers must be removed before remounting!
    // Or else they'll handle all events twice.
    function setupListener() {
      socket.emit('join-room', id);
    }

    function handleNewMessage(message) {
      setSocketMessages((previous) => [...previous, message]);
    }

    function handleMembersChanged() {
      fetcher.load();
    }

    function handleMessagesCleared() {
      setSocketMessages([]);
      fetcher.load();
    }

    function handleRoomDeleted() {
      // TODO: show message that explains why the user was redirected
      navigate('/');
    }

    socket.on('connect', setupListener);
    socket.on('new-message', handleNewMessage);
    socket.on('members-changed', handleMembersChanged);
    socket.on('messages-cleared', handleMessagesCleared);
    socket.on('room-deleted', handleRoomDeleted);

    return () => {
      // Close connection when unmounting
      socket.disconnect();
      // Remove event listeners
      socket.off('new-message', handleNewMessage);
      socket.off('connect', setupListener);
      socket.off('members-changed', handleMembersChanged);
      socket.off('messages-cleared', handleMessagesCleared);
      socket.off('room-deleted', handleRoomDeleted);
    };
  }, []);

  return (
    // TODO: show number of members
    <div className="room">
      <Header room={room} socketMessages={socketMessages} />
      <Messages room={room} socketMessages={socketMessages} />
      <MessagesForm room={room} socketMessages={socketMessages} />
    </div>
  );
}

export async function roomLoader({ params }) {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/rooms/${params.id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  if (!res.ok) {
    throw new Response('Unable to load room', { status: res.status });
  }

  return res.json();
}
