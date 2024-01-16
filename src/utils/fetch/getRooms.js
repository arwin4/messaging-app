import { useEffect, useState } from 'react';
import getJwt from '../getJwt';

export default function getRooms() {
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/rooms/`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${getJwt()}` },
          },
        );
        if (!res.ok) {
          throw new Error('Unable to fetch rooms from API');
        }
        const fetchedRooms = await res.json();
        setRooms(fetchedRooms);
        setError(''); // Prevent error state persisting
      } catch (err) {
        setError(err.message);
        setRooms(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);
  return { rooms, loading, error };
}
