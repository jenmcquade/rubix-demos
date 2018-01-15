import React from 'react';
import Stage from './components/containers/Stage';
import Menu from './components/containers/Menu';
import './animations/rotations.css';
import './components/3d/rubix/transform.css';

const App = () => (
  <div className="root">
    <Menu />
    <Stage />
  </div>
);

export default App;
