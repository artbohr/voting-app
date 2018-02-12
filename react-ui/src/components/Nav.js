import React from 'react'
import { NavLink } from 'react-router-dom'


class Nav extends React.Component {
  render () {
    return (
      <ul className='navbar'>
        <li><NavLink to='/' activeClassName='active'>Home</NavLink></li>
        <li><NavLink to='/polls' activeClassName='active'>Polls</NavLink></li>
      </ul>
    )
  }
}

export default Nav;
