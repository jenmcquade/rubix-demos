import React, { Component } from 'react';
import Box from './components/containers/Box'
import Menu from './components/containers/Menu'
import './animations/menu.css';
import './animations/rotations.css';
import './animations/text.css';
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
