import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Messages from '@components/rooms/Messages';
import MessagesForm from '@components/rooms/MessageForm';
import useRoom from '@hooks/rooms/useRoom';
import Header from '@components/rooms/Header';
import socket from '../socket.io/socket';
import './style/Room.css';

export default function Room() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [membersChanged, setMembersChanged] = useState(false);
  // When the socket receives a new message, it is pushed in this array
  const [socketMessages, setSocketMessages] = useState([]);
  const {
    room,
    loading: loadingRoom,
    error: fetchError,
  } = useRoom(id, membersChanged, setSocketMessages);

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
      setMembersChanged((prev) => !prev);
    }

    function handleRoomDeleted() {
      // TODO: show message that explains why the user was redirected
      navigate('/');
    }

    socket.on('connect', setupListener);
    socket.on('new-message', handleNewMessage);
    socket.on('members-changed', handleMembersChanged);
    socket.on('room-deleted', handleRoomDeleted);

    return () => {
      // Close connection when unmounting
      socket.disconnect();
      // Remove event listeners
      socket.off('new-message', handleNewMessage);
      socket.off('connect', setupListener);
      socket.off('members-changed', handleMembersChanged);
      socket.off('room-deleted', handleRoomDeleted);
    };
  }, []);

  if (fetchError)
    return <>There was an error loading the conversation: {fetchError}</>;
  if (loadingRoom) return <>Loading conversation...</>;

  return (
    // TODO: show number of members
    <div className="room">
      {/* <Title room={room} /> */}
      <Header room={room} setMembersChanged={setMembersChanged} />
      <Messages room={room} socketMessages={socketMessages} />
      <MessagesForm room={room}  socketMessages={socketMessages} />
    </div>
  );
}
