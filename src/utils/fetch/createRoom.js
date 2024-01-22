import getJwt from '../getJwt';

export default async function createRoom() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  return res.json();
}
