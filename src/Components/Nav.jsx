import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import TitleModal from './TitleModal'
import { logout } from '../Redux/auth';



class Nav extends Component {
  constructor(){
    super()
    this.onLogOut = this.onLogOut.bind(this)
  }

  onLogOut(){
    this.props.logout()
  }
  render() {
    console.log(this.props)
    return (
      <nav className='navigation'>
      <div className="nav-wrapper">
      <Link to="/" className="brand-logo center">CodeLib</Link>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
      {this.props.currentUser.name ? <li><li><Link to="/library">Your Library</Link></li></li> : <li><Link to="/codeInput">SignUp</Link></li>}
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          {this.props.currentUser.name && <li><Link to="/codeInput">Create Code Block</Link></li>}
          {this.props.currentUser.name ? <li onClick={this.onLogOut}><Link to="/codeInput">Logout</Link></li> : <li><Link to="/codeInput">Login</Link></li>}
      </ul>
    </div>
  </nav>
    );
  }
}

const mapState = (state) => ({ currentUser:state.currentUser});
const mapDispatch = (dispatch, ownProps) => (
  {
    logout: history => {
      dispatch(logout(ownProps.history));
    }
  })
export default connect(mapState,mapDispatch)(Nav);

