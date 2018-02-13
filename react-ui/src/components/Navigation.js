import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class Navigation extends React.Component {
  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Voting App
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem>
              <NavLink to='/' activeClassName='active'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/polls' activeClassName='active'>Polls</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/login' activeClassName='active'>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/register' activeClassName='active'>Register</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
