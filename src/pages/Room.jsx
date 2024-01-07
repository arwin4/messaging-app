import React from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../hooks/auth/rooms/useRoom';
import Title from '../components/rooms/Title';

export default function Room() {
  const { id } = useParams();
  const { room, loading: loadingRoom, error: fetchError } = useRoom(id);

  if (fetchError)
    return <>There was an error loading the conversation: {fetchError}</>;
  if (loadingRoom) return <>Loading conversation...</>;

  console.log(room);

  return (
    <main>
      <Title room={room} />
    </main>
  );
}
