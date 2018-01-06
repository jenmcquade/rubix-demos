import React, { Component } from 'react';
import Box from './components/containers/Box.js'
import Menu from './components/containers/Menu.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu></Menu>
        <div className="stage">
          <Box></Box>
        </div>
      </div>
    );
  }
}

export default App;
