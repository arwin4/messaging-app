import getJwt from '../getJwt';

export default async function getUser(username) {
  // try {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/users/${username}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    },
  );

  return res.json();

  //   if (!res.ok) {
  //     const errorResponse = await res.json();

  //     throw new Error('test');
  //   }

  //   const resBody = await res.json();
  // } catch (error) {
  //   console.log(error);
  // }
}
