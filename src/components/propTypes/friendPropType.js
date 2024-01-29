import PropTypes from 'prop-types';

const friendPropType = PropTypes.shape({
  _id: PropTypes.string,
  username: PropTypes.string,
  isBot: PropTypes.bool,
  duoRoomId: PropTypes.string,
});

export default friendPropType;
