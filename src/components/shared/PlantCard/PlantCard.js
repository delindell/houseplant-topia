import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PlantCard.scss';
import plantShape from '../../../helpers/data/propz/plantShape';

class PlantCard extends React.Component {
  static propTypes = {
    plant: plantShape.plantShape,
    killPlant: PropTypes.func.isRequired,
  }

  render() {
    const { plant, killPlant } = this.props;
    const singleLink = `/plants/${plant.id}`;
    return (
      <div className="PlantCard col-4">
        <div className="card mb-3">
        <div>
        <h3 className="card-title mt-2">{plant.nickname}</h3>
        <button className="btn btn-primary mb-3" onClick={() => killPlant(plant.id)}>X</button>
        </div>
        <img className="card-img-top" src={plant.imgUrl} alt="Plant" />
        <div className="card-body">
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
