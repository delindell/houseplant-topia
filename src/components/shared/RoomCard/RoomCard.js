import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RoomCard.scss';
import roomShape from '../../../helpers/data/propz/roomShape';

class RoomCard extends React.Component {
  static propTypes = {
    rooms: roomShape.roomShape,
    deleteRoom: PropTypes.func.isRequired,
  }

  render() {
    const { room, deleteRoom } = this.props;
    const singleLink = `/rooms/${room.id}`;

    return (
      <div className="RoomCard col-3 mb-3">
        <div className="card">
          <div className="card-header">
            <h3><strong>{room.name}</strong></h3>
            <button className="btn btn-primary ml-3" onClick={() => deleteRoom(room.id)}>X</button>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Number of Windows: {room.numOfWindows}</li>
            <li className="list-group-item">Hours of Sun: {room.sunDuration}</li>
            <li className="list-group-item">Sunlight Direction: {room.sunDirection}</li>
            <li className="list-group-item">Sunlight Intensity: {room.sunIntensity}</li>
          </ul>
          <Link className="btn btn-secondary mt-1 mb-1" to={singleLink}>View Plants this Room</Link>
          <button className="btn btn-success mb-1">Edit Room Details</button>
        </div>
      </div>
    );
  }
}

export default RoomCard;
