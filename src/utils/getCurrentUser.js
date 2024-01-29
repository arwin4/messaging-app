export default function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}
