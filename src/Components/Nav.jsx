import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../App.css';

class Nav extends Component {
  render() {
    return (
      <nav>
      <div class="nav-wrapper">
      <Link to="/" className="brand-logo center">CodeLib</Link>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
      <li>Your Library</li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/codeInput">Create Code Block</Link></li>
      </ul>
    </div>
  </nav>
    );
  }
}

export default Nav;
