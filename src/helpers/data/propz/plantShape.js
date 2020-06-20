import PropTypes from 'prop-types';

const plantShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  health: PropTypes.string.isRequired,
  dateCreated: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  waterFrequency: PropTypes.number.isRequired,
  roomId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { plantShape };
