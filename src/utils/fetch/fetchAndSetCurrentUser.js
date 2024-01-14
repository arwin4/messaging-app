import getJwt from '../getJwt';

const fetchAndSetCurrentUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  const user = await res.json();
  localStorage.setItem('user', JSON.stringify(user));
};

export default fetchAndSetCurrentUser;
