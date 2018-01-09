import React, { Component } from 'react';
import Perspective from '../menus/Perspective.js';
import '../styles/menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="container" className="menu">
        <Perspective></Perspective>
      </div>
    )
  }
}

export default Menu;