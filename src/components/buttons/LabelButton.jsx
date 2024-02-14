/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineIcon } from '@iconify/react';

export default function LabelButton({
  onClick,
  icon,
  inline,
  text,
  type,
  busy,
}) {
  const btnClass = classNames('label-btn', {
    inline,
    pending: busy === 'loading' || busy === 'submitting',
  });

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      <InlineIcon className="icon" icon={icon} height="unset" />
      {text}
    </button>
  );
}

/* Prop Types */
LabelButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  inline: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  busy: PropTypes.string,
};

LabelButton.defaultProps = {
  onClick: () => null,
  inline: '',
  type: 'button',
  busy: 'idle',
};
