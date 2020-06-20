import PropTypes from 'prop-types';

const roomShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  numOfWindows: PropTypes.number.isRequired,
  sunDuration: PropTypes.number.isRequired,
  sunDirection: PropTypes.string.isRequired,
  sunIntensity: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { roomShape };
