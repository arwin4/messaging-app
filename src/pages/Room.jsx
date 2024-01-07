import React from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../hooks/auth/rooms/useRoom';
import Title from '../components/rooms/Title';
import Messages from '../components/rooms/Messages';

export default function Room() {
  const { id } = useParams();
  const { room, loading: loadingRoom, error: fetchError } = useRoom(id);

  if (fetchError)
    return <>There was an error loading the conversation: {fetchError}</>;
  if (loadingRoom) return <>Loading conversation...</>;

  return (
    <main>
      <Title room={room} />
      <Messages room={room} />
    </main>
  );
}
