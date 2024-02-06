import PropTypes from 'prop-types';

const socketMessagesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    dateCreated: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
    }),
    content: PropTypes.shape({
      isText: PropTypes.bool,
      isImage: PropTypes.bool,
      textContent: PropTypes.string,
    }),
    _id: PropTypes.string,
  }),
);

export default socketMessagesPropType;
