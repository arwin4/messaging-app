import PropTypes from 'prop-types';

const roomPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  // dateCreated: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ),
  // isGroup: PropTypes.bool,
});

export default roomPropType;
