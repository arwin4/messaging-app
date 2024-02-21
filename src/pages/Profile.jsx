import React from 'react';
import './style/Profile.css';
import { InlineIcon } from '@iconify/react';
import getCurrentUser from '@utils/getCurrentUser';
import LabelButton from '@components/buttons/LabelButton';

import useAuth from '../hooks/auth/useAuth';

export default function Profile() {
  const currentUser = getCurrentUser();
  const { logout } = useAuth();

  return (
    <div className="profile">
      <h1 className="title">Profile</h1>
      <h2 className="username">Logged in as {currentUser.username}.</h2>
      <LabelButton
        onClick={() => logout()}
        icon="ri:logout-box-r-line"
        inline="true"
        text="Log out"
      />
      <div className="tip">
        <InlineIcon
          className="icon"
          icon="ri:lightbulb-flash-line"
          height="30"
          // height='unset'
        />
        <p>Tip: chat with yourself </p>
        <p>
          Chats display incoming chat messages in real time — no refreshing
          needed. If you&apos;d like to test this out, create another account in
          an incognito window and start a chat with this account.
        </p>
      </div>
    </div>
  );
}
