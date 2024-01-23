import getJwt from '../getJwt';

export default async function deleteRoom(roomId) {
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });
}
