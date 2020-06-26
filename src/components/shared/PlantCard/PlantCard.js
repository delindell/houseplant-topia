import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlantFormModal from '../PlantFormModal/PlantFormModal';
import './PlantCard.scss';
import plantShape from '../../../helpers/data/propz/plantShape';

class PlantCard extends React.Component {
  static propTypes = {
    plant: plantShape.plantShape,
    killPlant: PropTypes.func.isRequired,
    putPlant: PropTypes.func.isRequired,
  }

  state = {
    formOpen: false,
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { formOpen } = this.state;
    const { plant, killPlant, putPlant } = this.props;
    const singleLink = `/plants/${plant.id}`;
    return (
      <div className="PlantCard col-4">
        <div className="card mb-3">
        <div>
        <h3 className="card-title mt-2">{plant.nickname}</h3>
        <button className="btn btn-outline-success mb-3" onClick={() => killPlant(plant.id)}><i class="fas fa-skull"></i></button>
        </div>
        <div className="text-center">
        <img className="card-img-top" src={plant.imgUrl} alt="Plant" />
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Room: {plant.room ? plant.room.name : 'lost'}</strong></p>
          <div className="button-container">
            <Link className="btn btn-outline-success mr-3 mb-3" to={singleLink}>View</Link>
            <button className="btn btn-outline-success mb-3" onClick={() => this.setState({ formOpen: true })}>Edit Plant</button>
          { formOpen ? <PlantFormModal formClose={this.formClose} plant={plant} key={plant.id} putPlant={putPlant} getPlant={this.props.getPlants}/> : ''}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default PlantCard;
