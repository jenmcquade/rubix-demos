import React, { Component } from 'react';
import Perspective from '../menus/Perspective.js';
import '../styles/menu.css';

class Menu extends Component {
  render() {
    return (
      <div id="container" className="menu">
        <Perspective></Perspective>
      </div>
    )
  }
}

export default Menu;