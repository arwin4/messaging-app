/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { InlineIcon } from '@iconify/react';

export default function LabelButton({ onClick, icon, inline, text }) {
  return (
    <button
      type="button"
      className={`label-btn ${inline ? 'inline' : ''}`}
      onClick={onClick}
    >
      <InlineIcon className="icon" icon={icon} height="unset" />
      {text}
    </button>
  );
}

/* Prop Types */
LabelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  inline: PropTypes.string,
  text: PropTypes.string.isRequired,
};

LabelButton.defaultProps = {
  inline: '',
};
