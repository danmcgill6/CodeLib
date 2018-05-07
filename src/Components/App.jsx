import React, { Component } from 'react';
import Nav from './Nav'
import CodeInput from './CodeInput'
import RenderCode from './RenderCode'

import Library from './Library'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import '../App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Nav />
        <div id="main" className="container">
          <div className="col s8">
            <Route exact path="/codeInput" component={CodeInput} />
            <Route path="/render" component={RenderCode} />
            <Route path="/library" component={Library} />
          </div>
       </div>

      </div>
    </Router>

    );
  }
}

export default App;
