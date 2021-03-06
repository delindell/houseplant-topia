import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './UserProfileModal.scss';
import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';

class UserProfileModal extends React.Component {
  state = {
    modal: true,
    isOpen: true,
    isEditing: false,
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
  }

  componentDidMount() {
    const { user } = this.props;
    if (user && user.name) {
      this.setState({
        userName: user.name,
        userEmail: user.email,
        userPhoneNumber: user.phone,
        isEditing: true,
      });
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ modal: !this.state.modal });
    this.props.formClose();
  }

  nameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  emailChange = (e) => {
    this.setState({ userEmail: e.target.value });
  }

  phoneNumberChange = (e) => {
    this.setState({ userPhoneNumber: e.target.value });
  }

  saveProfile = (e) => {
    e.preventDefault();
    this.toggle();
    const {
      userEmail,
      userName,
      userPhoneNumber,
    } = this.state;
    const newProfile = {
      name: userName,
      email: userEmail,
      phone: userPhoneNumber,
      uid: authData.getUid(),
    };
    userData.postUser(newProfile)
      .then(() => this.props.getUserProfile())
      .catch((err) => console.error('error saving user profile', err));
  }

  updateProfile = (e) => {
    e.preventDefault();
    this.toggle();
    const {
      userEmail,
      userName,
      userPhoneNumber,
    } = this.state;
    const { user } = this.props;
    const updatedProfile = {
      name: userName,
      email: userEmail,
      phone: userPhoneNumber,
      uid: authData.getUid(),
    };
    userData.putProfile(user.id, updatedProfile)
      .then(() => this.props.getUserProfile())
      .catch((err) => console.error('error updating profile', err));
  }

  render() {
    const {
      modal,
      isEditing,
      userName,
      userEmail,
      userPhoneNumber,
    } = this.state;
    return (
      <div className="UserFormModal">
      <Modal isOpen={modal} toggle={this.toggle} >
      <ModalHeader toggle={this.toggle}>User Info</ModalHeader>
      <ModalBody>
        <form className="col-8 offset-2 text-left">
          <div className="form-group">
            <label htmlFor="user-name"><strong>Name</strong></label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              value={userName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-email"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              value={userEmail}
              onChange={this.emailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-phone-number"><strong>Phone Number</strong></label>
            <input
              type="tel"
              className="form-control"
              id="user-phone-number"
              value={userPhoneNumber}
              onChange={this.phoneNumberChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
      {
        isEditing
          ? <button className="btn btn-outline-success" onClick={this.updateProfile}>Update Profile</button>
          : <button className="btn btn-outline-success" onClick={this.saveProfile}>Save Profile</button>
      }
      </ModalFooter>
    </Modal>
    </div>
    );
  }
}

export default UserProfileModal;
