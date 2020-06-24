import React from 'react';

import './RoomSingleView.scss';
import roomsData from '../../../helpers/data/roomsData';
import plantsData from '../../../helpers/data/plantsData';

class RoomSingleView extends React.Component {
  state = {
    room: {},
    plants: [],
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    roomsData.getSingleRoom(roomId)
      .then((response) => this.setState({ room: response.data }))
      .catch((err) => console.error('error getting single room', err));
    plantsData.getPlantsInRoomByRoomId(roomId).then((plants) => {
      this.setState({ plants });
    });
  }

  render() {
    const { room } = this.state;

    return (
      <div className="RoomSingleView">
        <h1>RoomSingleView</h1>
        {room.name}
      </div>
    );
  }
}

export default RoomSingleView;
