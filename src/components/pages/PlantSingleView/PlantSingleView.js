import React from 'react';
import moment from 'moment';

import './PlantSingleView.scss';
import plantsData from '../../../helpers/data/plantsData';
import wateringData from '../../../helpers/data/wateringData';

class PlantSingleView extends React.Component {
  state = {
    plant: {},
    waterings: [],
  }

  componentDidMount() {
    const { plantId } = this.props.match.params;
    plantsData.getSinglePlant(plantId)
      .then((response) => this.setState({ plant: response.data }))
      .catch((err) => console.error('error getting single plant', err));
    wateringData.getWateringsByPlantId(plantId)
      .then((waterings) => this.setState({ waterings }));
  }

  killPlant = () => {
    const { plantId } = this.props.match.params;
    plantsData.deletePlant(plantId)
      .then(() => this.props.history.push('/plants'))
      .catch((err) => console.error('could not delete plant', err));
  }

  waterPlant = () => {
    const { plantId } = this.props.match.params;
    const newWatering = {
      plantId,
      timeStamp: moment().format('MMM Do YY'),
    };
    wateringData.addNewWatering(newWatering);
  }

  render() {
    const { plant, watering } = this.state;
    console.log('watering', watering);
    return (
      <div className="PlantSingleView">
        <button className="btn btn-success mt-2 mb-2" onClick={this.killPlant}><i class="fas fa-skull"></i></button>
        <h1>{plant.nickname}</h1>
        <img src={plant.imgUrl} alt="plant"/>
        <div className="plant-info-container mt-3">
          <p><strong>Type: {plant.type}</strong></p>
          <p><strong>Health: {plant.health}</strong></p>
          <p><strong>Notes: {plant.notes}</strong></p>
          <p><strong>{plant.nickname} needs to be watered every {plant.waterFrequency} days.</strong></p>
          {/* <p>{plant.nickname} was last watered {watering.timeStamp}</p> */}
          <a href={plant.resource} className="btn btn-outline-primary">Learn about Me!</a>
          <button className="water-button btn btn-outline-primary ml-2" onClick={this.waterPlant}>Water Me!</button>
        </div>
      </div>
    );
  }
}

export default PlantSingleView;
