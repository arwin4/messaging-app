import React from 'react';
import { Link, Navigate, useNavigation, useRouteError } from 'react-router-dom';
import './style/Error.css';
import LinkButton from '@components/buttons/LinkButton';

export default function Error() {
  const error = useRouteError();
  const navigation = useNavigation();

  const backToChatsBtn = (
    <Link to="/">
      <LinkButton
        icon="ri:chat-4-line"
        text="Back to chats"
        inline="true"
        // Set busy state when navigating away
        busy={Boolean(navigation.location?.pathname)}
      />
    </Link>
  );

  const toLoginBtn = (
    <Link to="/login">
      <LinkButton
        icon="ri:login-box-line"
        text="Log in again"
        inline="true"
        // Set busy state when navigating away
        busy={Boolean(navigation.location?.pathname)}
      />
    </Link>
  );

  switch (error.status) {
    case 400:
      return (
        <div className="error">
          {error.data} {backToChatsBtn}
        </div>
      );

    case 401:
      // Unauthorized
      return <Navigate to="/login" />;
    case 404:
      return (
        <div className="error">
          404 Not Found.
          {backToChatsBtn}
        </div>
      );
    default:
      return (
        <div className="error">
          An error occurred.
          {toLoginBtn}
        </div>
      );
  }
}
