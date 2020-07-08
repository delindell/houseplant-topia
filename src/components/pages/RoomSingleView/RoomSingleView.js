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
    const { room, plants } = this.state;
    const buildPlantsInsideRoom = () => plants.map((plant) => (
      <div key={plant.id} className="card col-3 m-3">
        <div className="plant-image text-center">
          <img className="card-img-top mt-2" src={plant.imgUrl} alt={plant.nickname} />
        </div>
        <div className="card-body">
          <h2 className="card-text">{plant.nickname}</h2>
        </div>
      </div>
    ));

    return (
      <div className="RoomSingleView">
        <h1>{room.name}</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {buildPlantsInsideRoom()}
        </div>
      </div>
    );
  }
}

export default RoomSingleView;
