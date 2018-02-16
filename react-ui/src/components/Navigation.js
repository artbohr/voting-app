import React from "react";
import { NavLink } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink to="/" className="navbar-brand">
              Voting App
            </NavLink>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/polls" activeStyle={{ 'background-color': 'white' }}>
                  Polls
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" activeStyle={{ 'background-color': 'white' }}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeStyle={{ 'background-color': 'white' }}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
