/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import LabelButton from './LabelButton';

export default function LinkButton({ text, icon, inline }) {
  return <LabelButton icon={icon} text={text} inline={inline} />;
}

/* Prop Types */
LinkButton.propTypes = {
  inline: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

LinkButton.defaultProps = {
  inline: '',
};
