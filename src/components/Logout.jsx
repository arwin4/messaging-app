import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/auth/useAuth';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  logout();
  useEffect(() => navigate('/'));
}
