/* eslint-disable react/prop-types */
export default function Welcome({ currentUser }) {
  const { username } = currentUser;
  return <>Welcome, {username}!</>;
}
