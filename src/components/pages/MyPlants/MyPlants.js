import React from 'react';

import authData from '../../../helpers/data/authData';
import plantsData from '../../../helpers/data/plantsData';

import PlantCard from '../../shared/PlantCard/PlantCard';
import PlantFormModal from '../../shared/PlantFormModal/PlantFormModal';

import './MyPlants.scss';
import smash from '../../../helpers/data/smash';


class MyPlants extends React.Component {
  state = {
    plants: [],
    formOpen: false,
  }

  componentDidMount() {
    this.getPlants();
    smash.getPlantsByRoom();
  }

  getPlants = () => {
    const uid = authData.getUid();
    plantsData.getPlantsByUid(uid)
      .then((plants) => this.setState({ plants }))
      .catch((err) => console.error('error getting plants', err));
  }

  putPlant = (plantId, updatedPlant) => {
    plantsData.updatePlant(plantId, updatedPlant)
      .then(() => {
        this.getPlants();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('error updating plant', err));
  }


  killPlant = (plantId) => {
    plantsData.deletePlant(plantId)
      .then(() => this.getPlants())
      .catch((err) => console.error('failed to delete plant', err));
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { plants, formOpen } = this.state;
    const buildPlantCards = plants.map((plant) => <PlantCard plant={plant} key={plant.id} putPlant={this.putPlant} killPlant={this.killPlant}/>);
    return (
      <div className="MyPlants">
        <h1>MyPlants</h1>
        <button className="btn btn-success mb-3" onClick={() => this.setState({ formOpen: true })}>Add New Plant</button>
        { formOpen ? <PlantFormModal formClose={this.formClose} getPlants={this.getPlants} /> : ''}
        <div className="d-flex flex-wrap">
          {buildPlantCards}
        </div>
      </div>
    );
  }
}

export default MyPlants;
