/* eslint-disable jsx-a11y/no-autofocus */
import LabelButton from '@components/buttons/LabelButton';
import React from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

export default function Signup() {
  const navigation = useNavigation();
  const errors = useActionData();
  const errorElement = errors ? (
    <div className="errors">
      {errors?.map((error) => (
        <p key={error.title}>{error.title}</p>
      ))}
    </div>
  ) : undefined;

  return (
    <div className="signup">
      <h2>Sign up</h2>
      {errorElement}

      <Form method="POST">
        <label htmlFor="username">
          Username (max. 12 characters)
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            maxLength={12}
            required
            autoFocus
          />
        </label>

        <label htmlFor="password">
          Password (min. 3 characters)
          <input
            type="password"
            name="password"
            id="password"
            minLength={3}
            maxLength={100}
            required
          />
        </label>

        <LabelButton
          icon="ri:arrow-right-double-fill"
          inline="true"
          text="Sign up"
          type="submit"
          busy={navigation.state !== 'idle'}
        />
      </Form>
    </div>
  );
}

export async function signupAction({ request }) {
  const data = await request.formData();

  const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.get('username'),
      password: data.get('password'),
    }),
  });

  if (!res.ok) {
    const { errors } = await res.json();
    return errors;
  }

  return redirect('/login');
}
