import React from 'react';
import { Link, Navigate, useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  console.log(error);

  switch (error.status) {
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
