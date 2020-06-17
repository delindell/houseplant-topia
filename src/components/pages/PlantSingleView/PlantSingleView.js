import React from 'react';

import './PlantSingleView.scss';
import plantsData from '../../../helpers/data/plantsData';

class PlantSingleView extends React.Component {
  state = {
    plant: {},
  }

  componentDidMount() {
    const { plantId } = this.props.match.params;
    plantsData.getSinglePlant(plantId)
      .then((response) => this.setState({ plant: response.data }))
      .catch((err) => console.error('error getting single plant', err));
  }

  killPlant = () => {
    const { plantId } = this.props.match.params;
    plantsData.deletePlant(plantId)
      .then(() => this.props.history.push('/plants'))
      .catch((err) => console.error('could not delete plant', err));
  }

  render() {
    const { plant } = this.state;
    return (
      <div className="PlantSingleView">
        <button className="btn btn-warning" onClick={this.killPlant}>X</button>
        <h1>{plant.nickname}</h1>
        <img src={plant.imgUrl} alt="plant"/>
      </div>
    );
  }
}

export default PlantSingleView;
