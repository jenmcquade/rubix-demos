import React from 'react';
import Cube from '../3d/rubix/Cube';

class Stage extends React.Component {
  render() {
    return(
      <div id="stage" className="stage" role="main">
        <Cube />
      </div>
    );
  }
}

export default Stage;
