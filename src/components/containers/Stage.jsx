import React from 'react';
import Cube from '../3d/rubix/Cube';
import EnvInfo from '../EnvInfo';
import ProxyInfo from '../ProxyInfo';
import 'html-gl/dist/htmlgl.min';

export default class Stage extends React.Component {
  render() {
    return(
      <div id="stage" className="stage" role="main">
        <Cube hasImagesOnLoad="false" />
        <div style={{fontSize: '1em', position: 'absolute', bottom: '0px', padding: '1em', letterSpacing: '0.10em'  }}>
          <ProxyInfo />
          { process.env.NODE_ENV !== 'production' && <EnvInfo />}
        </div>
      </div>
    );
  }
}

