import getJwt from '../getJwt';

export default function fetchDuoRoom(username) {
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/duo/${username}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
}
