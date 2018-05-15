import React, { Component } from 'react';
import Nav from './Nav'
import CodeInput from './CodeInput'
import RenderCode from './RenderCode'
import Library from './Library'
import Login from './Login'
import Home from './Home'
import Footer from './Footer'
import { connect } from 'react-redux';
import { persistUser } from '../Redux/auth';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


class App extends Component {
//  componentDidMount(){
//    let user = JSON.parse(localStorage.getItem('user'))
//    this.props.persistUser(user)
//  }
  render() {
    return (
      <Router>
      <div>
      <Nav />
        <div  id="main" className="container">
          <div className="col s8 main-view">
            <Route exact path="/" component={Home} />
            <Route exact path="/codeInput" component={CodeInput} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/render/:id" component={RenderCode} />
            <Route exact path="/render" component={RenderCode} />
            <Route exact path="/library" component={Library} />
            <Route path="/library/:id" component={Library} />
          </div>
       </div>
       <Footer />
      </div>
    </Router>

    );
  }
}
const mapDispatch = (dispatch, ownProps) => (
  {
    persistUser: credentials => {
      dispatch(persistUser(credentials, ownProps));
    }
  })

export default connect(null , mapDispatch)(App);

