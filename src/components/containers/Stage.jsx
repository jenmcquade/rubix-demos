import React from 'react';
import Cube from '../3d/rubix/Cube';

export default class Stage extends React.Component {
  render() {
    return(
      <div id="stage" className="stage" role="main">
        <Cube hasImages="true" />
      </div>
    );
  }
}

