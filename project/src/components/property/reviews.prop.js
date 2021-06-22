import PropTypes from 'prop-types';

export default PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  rating: PropTypes.number.isRequired,
  user: {
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  },
});
