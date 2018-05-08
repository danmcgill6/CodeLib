import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TitleModal from './TitleModal'



class Nav extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <nav className='navigation'>
      <div className="nav-wrapper">
      <Link to="/" className="brand-logo center">CodeLib</Link>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
      <li><Link to="/library">Your Library</Link></li>
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
