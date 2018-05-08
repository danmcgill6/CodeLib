import React, { Component } from 'react';
import Nav from './Nav'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


class Home extends Component {
  render() {
      console.log(this.props)
    return (
      <div>
          <h1>Welcome to CodeLib !</h1>
      </div>
    );
  }
}
const mapState = (state) => ({ currentUser:state.currentUser});
export default connect(mapState)(Home);
