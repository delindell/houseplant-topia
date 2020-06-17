import React from 'react';
import { Link } from 'react-router-dom';
import './PlantCard.scss';

class PlantCard extends React.Component {
  render() {
    const { plant, killPlant } = this.props;
    const singleLink = `/plants/${plant.id}`;
    return (
      <div className="PlantCard col-4">
        <div className="card mb-3">
        <button className="btn btn-primary ml-auto" onClick={() => killPlant(plant.id)}>X</button>
        <img className="card-img-top" src={plant.imgUrl} alt="Plant" />
        <div className="card-body">
          <h5 className="card-title">Plant Name: {plant.nickname}</h5>
          <p className="card-text">Location: {plant.roomId}</p>
          <div className="button-container">
            <Link className="btn btn-warning mr-3" to={singleLink}>View</Link>
            <button className="btn btn-success">Edit</button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default PlantCard;
