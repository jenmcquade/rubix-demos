import React, { Component } from 'react';
import '../styles/box.css';

class Box extends Component {
  render() {
    return (
      <div className="cube-wrapper">
        <div className="cube">
          <div id="top" className="face white">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div>
          <div id="front" className="face blue">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div>
          <div id="bottom" className="face yellow">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div>
          <div id="back" className="face green">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div>
          <div id="right" className="face orange">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div>
          <div id="left" className="face red">
            <div className="item corner top-left">top left</div>
            <div className="item side top">top</div>
            <div className="item corner top-right">top right</div>
            <div className="item side left">left</div>
            <div className="item center">center</div>
            <div className="item side right">right</div>
            <div className="item corner bottom-left">bot left</div>
            <div className="item side bottom">bottom</div>
            <div className="item corner bottom-right">bot right</div>
          </div> 
        </div>
      </div>
    )
  }
}

export default Box;
