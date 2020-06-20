import React from 'react';

import './MyRooms.scss';
import authData from '../../../helpers/data/authData';
import roomsData from '../../../helpers/data/roomsData';
import RoomCard from '../../shared/RoomCard/RoomCard';

class MyRooms extends React.Component {
  state = {
    rooms: [],
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

  render() {
    const { rooms } = this.state;
    const buildRoomCards = rooms.map((room) => <RoomCard room={room} key={room.id} deleteRoom={this.deleteRoom}/>);
    return (
      <div className="MyRooms">
        <h1>MyRooms</h1>
        <button className="btn btn-success mb-3">Add a new Room</button>
        <div className="d-flex flex-wrap">
          {buildRoomCards}
        </div>
      </div>
    );
  }
}

export default MyRooms;
