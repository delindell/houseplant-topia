import React from 'react';

import './UserProfile.scss';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

class UserProfile extends React.Component {
  state = {
    loading: true,
    formOpen: false,
    user: {},
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = () => {
    userData.getUserProfileByUid(authData.getUid())
      .then((user) => {
        if (user && user.name) {
          this.setState({ user, loading: false });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => console.error('error getting user', err));
  }

  formClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { formOpen, loading, user } = this.state;

    const buildProfile = () => {
      if (user.name) {
        return (
            <div className="user-info">
              <h3 className="m-3">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phone}</p>
              <button className="btn btn-success btn-lg m-3" onClick={() => this.setState({ formOpen: true })}>Edit Your Profile</button>
              { formOpen ? <UserProfileModal formClose={this.formClose} user={user} getUserProfile={this.getUserProfile} /> : '' }
            </div>
        );
      }
      return (
            <div>
              <button className="btn btn-success btn-lg m-3" onClick={() => this.setState({ formOpen: true })}>Create A Profile</button>
              { formOpen ? <UserProfileModal formClose={this.formClose} getUserProfile={this.getUserProfile} /> : '' }
              <h5>Create a user profile so you can recieve email or text alerts reminding you to water your plants!</h5>
            </div>
      );
    };

    return (
      <div className="UserProfile">
        <h1 className="mt-2">Profile Page</h1>
        {
          loading
            ? '' : buildProfile()
        }
      </div>
    );
  }
}

export default UserProfile;
