import getJwt from '../getJwt';

export default async function deleteMessages(roomId) {
  return fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}/messages`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    },
  );
}
