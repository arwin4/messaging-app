import React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon, InlineIcon } from '@iconify/react';
// import useAuth from '../hooks/auth/useAuth';
import './style/Navigation.css';

export default function Navigation() {
  // const { logout } = useAuth();

  return (
    <nav className="nav-bar">
      <NavLink className="item" to="/">
        <InlineIcon className="icon" icon="ri:chat-4-line" height="unset" />
        <div className="description">Chats</div>
        <div className="active-indicator" />
      </NavLink>
      <NavLink className="item" to="/friends">
        <InlineIcon className="icon" icon="ri:user-heart-line" height="unset" />
        <div className="description">Friends</div>
        <div className="active-indicator" />
      </NavLink>
      <NavLink className="item" to="/profile">
        <InlineIcon
          className="icon"
          icon="ri:account-box-line"
          height="unset"
        />
        <div className="description">Profile</div>

        <div className="active-indicator" />
      </NavLink>
    </nav>
  );
}
