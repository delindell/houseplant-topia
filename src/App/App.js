import React from 'react';

import Auth from '../components/Auth/Auth';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>House Plant Shizz</h1>
        <Auth />
      </div>
    );
  }
}

export default App;
