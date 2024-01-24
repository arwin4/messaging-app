import getJwt from '../getJwt';

export default async function convertToGroupRoom(roomId) {
  return fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}/convert-to-group`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    },
  );
}
