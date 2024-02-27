/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAuth from '@hooks/auth/useAuth';
import LinkButton from '@components/buttons/LinkButton';
import LabelButton from '@components/buttons/LabelButton';

export default function Login() {
  const { login, authed } = useAuth();
  const { state } = useLocation();
  const [loginErrors, setLoginErrors] = useState(null);

  if (authed) {
    return <Navigate to={state?.path || '/'} />;
  }

  async function handleLogin(e) {
    const res = await login(e);
    if (!res.ok) {
      const resJson = await res.json();
      const { errors } = resJson;
      setLoginErrors(errors);
    }
  }

  return (
    <div className="login">
      <h2>Log in</h2>

      {loginErrors ? (
        <div className="errors">
          {loginErrors?.map((error) => (
            <p key={error.title}>{error.title}</p>
          ))}
        </div>
      ) : undefined}

      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" name="username" required autoFocus />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            required
          />
        </label>

        <LabelButton
          icon="ri:arrow-right-double-fill"
          inline="true"
          text="Log in"
          type="submit"
          // TODO: busy state
          // busy={busy}
        />
      </form>

      <div className="signup-container">
        <Link to="/signup">
          <LinkButton
            icon="ri:arrow-right-double-fill"
            text="Sign up in 10 seconds"
            inline="true"
            // TODO: busy state
            // busy={goToChatBusy}
          />
        </Link>
      </div>
    </div>
  );
}

// export async function loginAction({ request }) {
//   const data = await request.formData();
// }
