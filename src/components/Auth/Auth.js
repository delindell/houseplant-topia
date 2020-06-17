import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  render() {
    return (
      <div className="Auth text-center">
        <h1>Auth Page</h1>
        <button className="btn btn-danger">Google Login</button>
      </div>
    );
  }
}

export default Auth;
