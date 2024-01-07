import { useEffect, useState } from 'react';
import getJwt from '../../../utils/getJwt';

export default function useRoom(id) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/rooms/${id}`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${getJwt()}` },
          },
        );
        if (!res.ok) {
          throw new Error('Unable to fetch posts from API');
        }
        const fetchedRoom = await res.json();
        setRoom(fetchedRoom);
        setError(''); // Prevent error state persisting
      } catch (err) {
        setError(err.message);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, []);
  return { room, loading, error };
}
