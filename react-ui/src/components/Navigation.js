import React from 'react';
import {Nav, Navbar, NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Navigation extends React.Component {
  render() {
    return (<div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Voting App
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <LinkContainer to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/polls">
            <NavItem>Polls</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>
          <LinkContainer to="/register">
            <NavItem>Register</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    </div>)
  }
}

export default Navigation;
