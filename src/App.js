import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="menu closed">
          <div class="nav-item" id="perspective">
            <a onClick="{toggleMenu(this)}">
              <i class="glyphicon glyphicon-th"></i>
                <span>Perspective</span>
            </a>
            <div class="content"></div>
          </div>
        </div>
        <div class="stage">
          <div class="wrapper">
            <div class="cube">
              <div id="top" class="face white">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div>
              <div id="front" class="face blue">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div>
              <div id="bottom" class="face yellow">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div>
              <div id="back" class="face green">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div>
              <div id="right" class="face orange">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div>
              <div id="left" class="face red">
                <div class="item corner top-left">top left</div>
                <div class="item side top">top</div>
                <div class="item corner top-right">top right</div>
                <div class="item side left">left</div>
                <div class="item center">center</div>
                <div class="item side right">right</div>
                <div class="item corner bottom-left">bot left</div>
                <div class="item side bottom">bottom</div>
                <div class="item corner bottom-right">bot right</div>
              </div> 
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
