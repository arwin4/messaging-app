/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import LabelButton from './LabelButton';

export default function LinkButton({ text, icon, inline, busy }) {
  return <LabelButton icon={icon} text={text} inline={inline} busy={busy} />;
}

/* Prop Types */
LinkButton.propTypes = {
  inline: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  busy: PropTypes.bool,
};

LinkButton.defaultProps = {
  inline: '',
  busy: false,
};
