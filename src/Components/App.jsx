import React, { Component } from 'react';
import Nav from './Nav'
import CodeInput from './CodeInput'
import RenderCode from './RenderCode'
import Library from './Library'
import Home from './Home'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Nav />
        <div id="main" className="container">
          <div className="col s8">
            <Route exact path="/" component={Home} />
            <Route exact path="/codeInput" component={CodeInput} />
            <Route exact path="/render" component={RenderCode} />
            <Route exact path="/library" component={Library} />
            <Route path="/library/:id" component={Library} />
          </div>
       </div>

      </div>
    </Router>

    );
  }
}

export default App;
