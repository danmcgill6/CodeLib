import React, { Component } from 'react';
import Nav from './Nav'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUp from './SignUp'


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {user:{}}
    }

    componentDidMount(){
        
    }
  render() {
    return (
      <div>
         {this.props.user ? <h1>Welcome Back!</h1> : <h1>Welcome to CodeLib !</h1>} 
         {this.props.user ? <h1>Recent Code Blocks</h1> : <SignUp />} 
      </div>
    );
  }
}
const mapState = (state) => ({ currentUser:state.currentUser});
export default connect(mapState)(Home);
