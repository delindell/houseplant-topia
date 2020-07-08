import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Auth from '../components/pages/Auth/Auth';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';
import MyPlants from '../components/pages/MyPlants/MyPlants';
import MyRooms from '../components/pages/MyRooms/MyRooms';
import RoomSingleView from '../components/pages/RoomSingleView/RoomSingleView';
import PlantSingleView from '../components/pages/PlantSingleView/PlantSingleView';
import UserProfile from '../components/pages/UserProfile/UserProfile';

import fbConnection from '../helpers/data/connection';

import './App.scss';


fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/plants', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar authed={authed}/>
              <div className="container">
                <div className="row justify-content-center">
                  <Switch>
                    <PrivateRoute path='/profile' component={UserProfile} authed={authed} />
                    <PrivateRoute path='/rooms/:roomId' component={RoomSingleView} authed={authed} />
                    <PrivateRoute path='/plants/:plantId' component={PlantSingleView} authed={authed} />
                    <PrivateRoute path='/plants' component={MyPlants} authed={authed} />
                    <PrivateRoute path='/rooms' component={MyRooms} authed={authed} />
                    <PublicRoute path='/auth' component={Auth} authed={authed} />
                    <Redirect from="*" to="/plants" />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          </BrowserRouter>
        <footer><h4>HousePlant-Topia &copy;2020 Davis Lindell</h4></footer>
      </div>
    );
  }
}

export default App;
