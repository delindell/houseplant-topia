import React from 'react';

import './MyRooms.scss';
import authData from '../../../helpers/data/authData';
import roomsData from '../../../helpers/data/roomsData';
import RoomCard from '../../shared/RoomCard/RoomCard';
import RoomFormModal from '../../shared/RoomFormModal/RoomFormModal';

class MyRooms extends React.Component {
  state = {
    rooms: [],
    formOpen: false,
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms = () => {
    const uid = authData.getUid();
    roomsData.getRoomsByUid(uid)
      .then((rooms) => this.setState({ rooms }))
      .catch((err) => console.error('error getting rooms', err));
  }

  deleteRoom = (roomId) => {
    roomsData.removeRoom(roomId)
      .then(() => this.getRooms())
      .catch((err) => console.error('could not delete room', err));
  }

  putRoom = (roomId, updatedRoom) => {
    roomsData.updateRoom(roomId, updatedRoom)
      .then(() => {
        this.getRooms();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('error updating room', err));
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { rooms, formOpen } = this.state;
    const buildRoomCards = rooms.map((room) => <RoomCard room={room} key={room.id} deleteRoom={this.deleteRoom} putRoom={this.putRoom} />);
    return (
      <div className="MyRooms">
        <h1>My Rooms</h1>
        <button className="btn btn-success mb-3" onClick={() => this.setState({ formOpen: true })}>Add New Room</button>
        { formOpen ? <RoomFormModal formClose={this.formClose} getRooms={this.getRooms} /> : ''}
        <div className="d-flex flex-wrap">
          {buildRoomCards}
        </div>
      </div>
    );
  }
}

export default MyRooms;
