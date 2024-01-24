import getJwt from '../getJwt';

export default async function deleteMember(roomId, memberId) {
  return fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}/members`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        membersToDelete: [memberId],
      }),
    },
  );
}
