import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../hooks/rooms/useRoom';
import Title from '../components/rooms/Title';
import Messages from '../components/rooms/Messages';
import MessagesForm from '../components/rooms/MessageForm';
import socket from '../socket.io/socket';
import RoomActions from '../components/rooms/RoomActions';

export default function Room() {
  const { id } = useParams();
  const [membersChanged, setMembersChanged] = useState(false);
  const {
    room,
    loading: loadingRoom,
    error: fetchError,
  } = useRoom(id, membersChanged);

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
      socket.emit('listen-for-messages');
    }

    function handleNewMessage(message) {
      setSocketMessages((previous) => [...previous, message]);
    }

    socket.on('connect', setupListener);
    socket.on('new-message', handleNewMessage);

    return () => {
      // Close connection when unmounting
      socket.disconnect();
      // Remove event listeners
      socket.off('new-message', handleNewMessage);
      socket.off('connect', setupListener);
    };
  }, []);

  if (fetchError)
    return <>There was an error loading the conversation: {fetchError}</>;
  if (loadingRoom) return <>Loading conversation...</>;

  return (
    <main>
      <Title room={room} />
      <RoomActions room={room} setMembersChanged={setMembersChanged} />
      <Messages room={room} socketMessages={socketMessages} />
      <MessagesForm room={room} />
    </main>
  );
}
