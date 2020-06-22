import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './PlantFormModal.scss';
import roomsData from '../../../helpers/data/roomsData';
import authData from '../../../helpers/data/authData';
import plantsData from '../../../helpers/data/plantsData';

class PlantFormModal extends React.Component {
  static propTypes = {
    getPlant: PropTypes.func.isRequired,
    formClose: PropTypes.func.isRequired,
  }

  state = {
    rooms: [],
    plants: [],
    isOpen: true,
    modal: true,
    plantType: '',
    plantName: '',
    plantImgUrl: '',
    plantResource: '',
    plantNotes: '',
    plantHealth: '',
    plantWateringFrequency: 0,
    plantRoomId: '',
    checked: false,
  }

  componentDidMount() {
    roomsData.getRoomsByUid(authData.getUid()).then((rooms) => {
      plantsData.getPlantsByUid(authData.getUid())
        .then((plants) => this.setState({ rooms, plants }))
        .catch((err) => console.error('error building room radio buttons with plants', err));
    });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ modal: !this.state.modal });
    this.props.formClose();
  }

  roomChange = (e) => {
    this.setState({ plantRoomId: e.target.value });
    this.setState({ selectedOption: e.target.checked });
  }

  typeChange = (e) => {
    this.setState({ plantType: e.target.value });
  }

  nameChange = (e) => {
    this.setState({ plantName: e.target.value });
  }

  imageChange = (e) => {
    this.setState({ plantImgUrl: e.target.value });
  }

  resourceChange = (e) => {
    this.setState({ plantResource: e.target.value });
  }

  healthChange = (e) => {
    this.setState({ plantHealth: e.target.value });
  }

  notesChange = (e) => {
    this.setState({ plantNotes: e.target.value });
  }

  wateringChange = (e) => {
    this.setState({ plantWateringFrequency: e.target.value });
  }

  savePlant = (e) => {
    e.preventDefault();
    this.toggle();
    const {
      plantType,
      plantImgUrl,
      plantName,
      plantNotes,
      plantResource,
      plantWateringFrequency,
      plantHealth,
      plantRoomId,
    } = this.state;
    const newPlant = {
      type: plantType,
      nickname: plantName,
      imgUrl: plantImgUrl,
      resource: plantResource,
      health: plantHealth,
      dateCreated: Date.now(),
      note: plantNotes,
      waterFrequency: plantWateringFrequency * 1,
      roomId: plantRoomId,
      uid: authData.getUid(),
    };
    plantsData.postPlant(newPlant)
      .then(() => {
        this.props.getPlants();
      })
      .catch((err) => console.error('unable to save new plant', err));
  }

  render() {
    const {
      modal,
      plantType,
      plantImgUrl,
      plantName,
      plantNotes,
      plantResource,
      plantWateringFrequency,
      plantHealth,
      plantRoomId,
      rooms,
      plants,
    } = this.state;

    const buildRoomRadios = () => rooms.map((room, i) => (
        <div className="form-group form-check">
          <input
            type="radio"
            className="form-check-input"
            id="room-name"
            checked={plantRoomId === room.id}
            value={room.id}
            onChange={this.roomChange}
            />
          <label className="form-check-label" htmlFor="room-name">{room.name}</label>
        </div>
    ));

    return (
      <div className="PlantFormModal">
        <Modal isOpen={modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>Plant Info</ModalHeader>
        <ModalBody>
          <form className="col-6 offset-3 text-left">
            {buildRoomRadios()}
            <div className="form-group">
              <label htmlFor="plant-type">Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Type of House Plant"
                id="plant-type"
                value={plantType}
                onChange={this.typeChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name of House Plant"
                id="plant-name"
                value={plantName}
                onChange={this.nameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-image">Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Image of Plant"
                id="plant-image"
                value={plantImgUrl}
                onChange={this.imageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-resource">Resource</label>
              <input
                type="text"
                className="form-control"
                id="plant-resource"
                value={plantResource}
                onChange={this.resourceChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-health">Health</label>
              <input
                type="text"
                className="form-control"
                id="plant-health"
                value={plantHealth}
                onChange={this.healthChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-notes">Notes</label>
              <input
                type="text"
                className="form-control"
                id="plant-notes"
                value={plantNotes}
                onChange={this.notesChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plant-water-frequency">How Often Does it Need to be Watered?</label>
              <input
                type="number"
                className="form-control"
                id="plant-water-frequency"
                value={plantWateringFrequency}
                onChange={this.wateringChange}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.savePlant}>Save Plant</Button>{' '}
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default PlantFormModal;
