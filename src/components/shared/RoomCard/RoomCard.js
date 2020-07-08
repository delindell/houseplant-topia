import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RoomCard.scss';
import roomShape from '../../../helpers/data/propz/roomShape';
import RoomFormModal from '../RoomFormModal/RoomFormModal';

class RoomCard extends React.Component {
  static propTypes = {
    rooms: roomShape.roomShape,
    deleteRoom: PropTypes.func.isRequired,
    putRoom: PropTypes.func.isRequired,
  }

  state = {
    formOpen: false,
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { formOpen } = this.state;
    const { room, deleteRoom, putRoom } = this.props;
    const singleLink = `/rooms/${room.id}`;

    return (
      <div className="RoomCard col-md-4 col-12 mb-3">
        <div className="card">
          <div className="card-header">
            <h3><strong>{room.name}</strong></h3>
            <button className="btn btn-outline-success ml-3" onClick={() => deleteRoom(room.id)}><i className="far fa-trash-alt"></i></button>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Number of Windows: {room.numOfWindows}</li>
            <li className="list-group-item">Hours of Sun: {room.sunDuration}</li>
            <li className="list-group-item">Sunlight Direction: {room.sunDirection}</li>
            <li className="list-group-item">Sunlight Intensity: {room.sunIntensity}</li>
          </ul>
          <Link className="btn btn-outline-success m-2" key={room.id} to={singleLink}>View Plants this Room</Link>
          <button className="btn btn-outline-success m-2" onClick={() => this.setState({ formOpen: true })}>Edit Room Details</button>
          { formOpen ? <RoomFormModal formClose={this.formClose} room={room} putRoom={putRoom}/> : ''}
        </div>
      </div>
    );
  }
}

export default RoomCard;
