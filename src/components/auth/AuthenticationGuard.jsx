import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import PropTypes from 'prop-types';

// TODO: Add loading

export default function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    // onRedirecting: () => loading,
  });

  return <Component />;
}

AuthenticationGuard.propTypes = {
  component: PropTypes.elementType.isRequired,
};
