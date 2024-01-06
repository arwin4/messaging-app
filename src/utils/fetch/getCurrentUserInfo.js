import getJwt from '../getJwt';

export default async function getCurrentUserInfo() {
  console.log('getting user info');
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  // TODO: handle error

  return res.json();
}
