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
      <div className="center-align">
         {this.props.currentUser.email ? <h1>Welcome Back!</h1> : <h1>Welcome to CodeLib !</h1>} 
         {/* {this.props.currentUser.email ? <h1>Recent Code Blocks</h1> : <SignUp />}  */}
         <p>Code Lib is an online tool for programmers to save and document useful code snippets. 
           While developing you ogten repeat yourself, so why not store some of your most common designs all on one place?
           With codeLib you create a block , add a title and description , and save it to your library.</p>
      </div>
    );
  }
}
const mapState = (state) => ({ currentUser:state.currentUser});
export default connect(mapState)(Home);
