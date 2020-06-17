import React from 'react';

import './PlantCard.scss';

class PlantCard extends React.Component {
  render() {
    const { plant } = this.props;
    return (
      <div className="PlantCard col-4">
        <div className="card mb-3">
        <button className="btn btn-primary ml-auto">X</button>
        <img className="card-img-top" src={plant.imgUrl} alt="Plant" />
        <div className="card-body">
          <h5 className="card-title">Plant Name: {plant.nickname}</h5>
          <p className="card-text">Location: {plant.roomId}</p>
          <div className="button-container">
            <button className="btn btn-warning mr-3">View</button>
            <button className="btn btn-success">Edit</button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default PlantCard;
