import React from 'react';

import authData from '../../../helpers/data/authData';
import plantsData from '../../../helpers/data/plantsData';

import PlantCard from '../../shared/PlantCard/PlantCard';

import './MyPlants.scss';


class MyPlants extends React.Component {
  state = {
    plants: [],
  }

  componentDidMount() {
    this.getPlants();
  }

  getPlants = () => {
    const uid = authData.getUid();
    plantsData.getPlantsByUid(uid)
      .then((plants) => this.setState({ plants }))
      .catch((err) => console.error('error getting plants', err));
  }

  render() {
    const { plants } = this.state;
    const buildPlantCards = plants.map((plant) => <PlantCard plant={plant} key={plant.id} />);
    return (
      <div className="MyPlants">
        <h1>MyPlants</h1>
        <button className="btn btn-success mb-3">Add New Plant</button>
        <div className="d-flex flex-wrap">
          {buildPlantCards}
        </div>
      </div>
    );
  }
}

export default MyPlants;
