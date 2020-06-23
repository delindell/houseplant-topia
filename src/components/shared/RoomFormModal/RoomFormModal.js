import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './RoomFormModal.scss';
import authData from '../../../helpers/data/authData';
import roomsData from '../../../helpers/data/roomsData';

class RoomFormModal extends React.Component {
  static propTypes = {
    getRooms: PropTypes.func.isRequired,
    formClose: PropTypes.func.isRequired,
  }

  state = {
    isOpen: true,
    modal: true,
    isEditing: false,
    roomName: '',
    roomSunDirection: '',
    roomSunIntensity: '',
    roomWindows: 0,
    roomSunDuration: 0,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ modal: !this.state.modal });
    this.props.formClose();
  }

  nameChange = (e) => {
    this.setState({ roomName: e.target.value });
  }

  sunDirectionChange = (e) => {
    this.setState({ roomSunDirection: e.target.value });
  }

  sunIntensityChange = (e) => {
    this.setState({ roomSunIntensity: e.target.value });
  }

  windowChange = (e) => {
    this.setState({ roomWindows: e.target.value });
  }

  durationChange = (e) => {
    this.setState({ roomSunDuration: e.target.value });
  }

  saveRoom = (e) => {
    e.preventDefault();
    this.toggle();
    const {
      roomName,
      roomSunDirection,
      roomSunIntensity,
      roomWindows,
      roomSunDuration,
    } = this.state;
    const newRoom = {
      name: roomName,
      numOfWindows: roomWindows * 1,
      sunDuration: roomSunDuration * 1,
      sunDirection: roomSunDirection,
      sunIntensity: roomSunIntensity,
      uid: authData.getUid(),
    };
    roomsData.postRoom(newRoom)
      .then(() => {
        this.props.getRooms();
      })
      .catch((err) => console.error('unable to save room', err));
  }


  render() {
    const {
      modal,
      isEditing,
      roomName,
      roomSunDirection,
      roomSunIntensity,
      roomWindows,
      roomSunDuration,
    } = this.state;

    return (
      <div className="RoomFormModal">
        <Modal isOpen={modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>Room Info</ModalHeader>
        <ModalBody>
          <form className="col-6 offset-3 text-left">
            <div className="form-group">
              <label htmlFor="room-name">Room Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name of the Room"
                id="room-name"
                value={roomName}
                onChange={this.nameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-sun-direction">Sunlight Direction</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Sun Direction"
                id="room-sun-direction"
                value={roomSunDirection}
                onChange={this.sunDirectionChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-sun-intensity">Sunlight Intensity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Sun Intensity"
                id="room-sun-intensity"
                value={roomSunIntensity}
                onChange={this.sunIntensityChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-windows">Number of Windows</label>
              <input
                type="number"
                className="form-control"
                id="room-windows"
                value={roomWindows}
                onChange={this.windowChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room-sun-duration">Sunlight Duration</label>
              <input
                type="number"
                className="form-control"
                id="room-sun-duration"
                value={roomSunDuration}
                onChange={this.durationChange}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        {
          isEditing
            ? <button className="btn btn-primary" onClick={this.updatePlant}>Update Plant</button>
            : <button className="btn btn-primary" onClick={this.saveRoom}>Save Room</button>
        }
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default RoomFormModal;
