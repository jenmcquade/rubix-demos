import React from 'react';
import Cube from '../3d/rubix/Cube';
import EnvInfo from '../EnvInfo';
import ProxyInfo from '../ProxyInfo';
import queryString from 'query-string';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
  }
  render() {
    let parsedQs = {...queryString.parse(window.location.search)};
    return(
      <div id="stage" className="stage" role="main">
        <Cube hasImagesOnLoad="false" />
        <div style={{fontSize: '1em', position: 'absolute', bottom: '0px', padding: '1em', letterSpacing: '0.10em'  }}>
          { parsedQs.hasOwnProperty('info') && <ProxyInfo /> }
          { parsedQs.hasOwnProperty('info') && process.env.NODE_ENV !== 'production' && <EnvInfo/> }
        </div>
      </div>
    );
  }
}