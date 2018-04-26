import React, { Component } from 'react';
import Nav from './Nav'
import CodeInput from './CodeInput'
import RenderCode from './RenderCode'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import '../App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Nav />
 
      <div id="main" className="container">
      <div className="col s12">
        <Route exact path="/" component={CodeInput} />
        <Route path="/render" component={RenderCode} />
          </div>
        </div>
      </div>
    </Router>

    );
  }
}

export default App;
