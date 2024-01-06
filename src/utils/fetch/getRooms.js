import getJwt from '../getJwt';

export default async function getRooms() {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  // TODO: handle error

  return res.json();
}
