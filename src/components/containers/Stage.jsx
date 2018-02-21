import React from 'react';
import Cube from '../3d/rubix/Cube';
import EnvInfo from '../EnvInfo';
import ProxyInfo from '../ProxyInfo';
import queryString from 'query-string';
import Draggable from 'react-draggable';

import Styles from './container.styles';

const styles = new Styles();
const InfoLink = styles.info;

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      parsedQs: {...queryString.parse(window.location.search)}
    }
    this.handleStart = handleStart.bind(this);
    this.handleDrag = handleDrag.bind(this);
    this.handleStop = handleStop.bind(this);
    this.handleProjectInfoClick = handleProjectInfoClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({parsedQs: {...queryString.parse(window.location.search)}});
  }
  render() {
    return(
      <div id="stage" className="stage" role="main">
        <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
          <Cube hasImagesOnLoad="false" />
        </Draggable>
        <div style={{fontSize: '1em', position: 'absolute', bottom: '0px', padding: '1em', letterSpacing: '0.10em'  }}>
          <InfoLink onClick={this.handleProjectInfoClick}>
            <i className='fa fa-info-circle'/>
          </InfoLink>
          { this.state.parsedQs.hasOwnProperty('info') && <ProxyInfo /> }
          { this.state.parsedQs.hasOwnProperty('info') && process.env.NODE_ENV !== 'production' && <EnvInfo/> }
        </div>
      </div>
    );
  }
}

function handleProjectInfoClick() {

}

function handleStart() {

}

function handleDrag() {

}

function handleStop() {

}