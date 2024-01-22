import getJwt from '../getJwt';

export default async function addMemberToRoom(roomId, memberId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/rooms/${roomId}/members`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newMembers: [memberId],
      }),
    },
  );

  return res.json();
}
