import React, { Component } from 'react';
import Nav from './Nav'
import CodeInput from './CodeInput'

import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Nav />
        <div className='container'>
          <h1>Welcome to codeLib</h1>
          <CodeInput />
        </div>
      </div>
    );
  }
}

export default App;
