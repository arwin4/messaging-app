import React from 'react';
import { Link, Navigate, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  switch (error.status) {
    case 400:
      return (
        <div>
          {error.data} <Link to="/">Back to homepage</Link>{' '}
        </div>
      );

    case 401:
      // Unauthorized
      return <Navigate to="/login" />;
    case 404:
      return (
        <div>
          404 Not Found. <Link to="/">Back to homepage</Link>
        </div>
      );
    default:
      return (
        <div>
          An error occurred. <Link to="/login">Go to login</Link>
        </div>
      );
  }
}
