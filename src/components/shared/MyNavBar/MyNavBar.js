import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './MyNavBar.scss';

class MyNavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavBar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="mt-1" tag={RRNavLink} to='/plants'>My Plants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="mt-1" tag={RRNavLink} to='/rooms'>My Rooms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="mt-1" tag={RRNavLink} to='/profile'>My Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="btn" onClick={() => firebase.auth().signOut()}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div className="MyNavBar">
        <Navbar light expand="md">
          <NavbarBrand href="/">House Plant-Topia!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {buildNavBar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavBar;
