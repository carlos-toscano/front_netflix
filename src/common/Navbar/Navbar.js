import React, { Component } from 'react';
import payload from './../../payload';
import './Navbar.scss';

class Navbar extends Component {

  render() {
    return (
      <nav>
        <div className="nav-wrapper bg-main">
          <a href="/" className="brand-logo">My Netflix</a>
          <ul className="right hide-on-med-and-down">
            {
              localStorage.getItem('netflixToken') !== null ? (
                  <React.Fragment>
                    <li><a href="/me">Hola { payload().email }</a></li>
                    <li><a href="/movies">Películas</a></li>
                    <li><a href="/logout">Log Out</a></li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                  </React.Fragment>
                )
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
