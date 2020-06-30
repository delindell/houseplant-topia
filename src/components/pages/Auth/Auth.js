import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth text-center">
        <h1>Welcome to House Plant-Topia!</h1>
        <p>Here you can keep track of your houseplants, an easy thing to forget!</p>
        <button className="btn btn-danger btn-lg" onClick={this.loginClickEvent}><i className="fab fa-google"></i></button>
      </div>
    );
  }
}

export default Auth;
