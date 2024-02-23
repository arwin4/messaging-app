import { InlineIcon } from '@iconify/react';
import React from 'react';
import PropTypes from 'prop-types';
import './style/Landing.css';

export default function LandingLayout({ children }) {
  return (
    <div className="landing">
      <header>
        <InlineIcon
          className="icon"
          icon="ri:chat-smile-3-line"
          height="unset"
        />
        <h1>Welcome to Chat App!</h1>
      </header>

      {children}
    </div>
  );
}

LandingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
