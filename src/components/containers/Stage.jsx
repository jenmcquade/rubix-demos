import React from 'react';
import Cube from '../3d/rubix/Cube';
import EnvInfo from '../EnvInfo';
import ProxyInfo from '../ProxyInfo';
import queryString from 'query-string';

import Styles from './container.styles';

const styles = new Styles();
const InfoLink = styles.info;
const InfoWrap = styles.infoWrap;

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      parsedQs: {...queryString.parse(window.location.search)},
      appInfoIsOpen: false,
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
        <Cube hasImagesOnLoad="false" />
        <InfoWrap isOpen={this.state.appInfoIsOpen} id="infoWrapper">
          <InfoLink to="?info" onClick={this.handleProjectInfoClick}>
            <i className='fa fa-info-circle'/>
          </InfoLink>
          <div style={{borderBottom: '1px solid white', }} />
          { <ProxyInfo /> }
          { process.env.NODE_ENV !== 'production' && <EnvInfo/> }
        </InfoWrap>
      </div>
    );
  }
}

function handleProjectInfoClick(e) {
  this.setState({appInfoIsOpen: !this.state.appInfoIsOpen});
}

function handleStart() {

}

function handleDrag() {

}

function handleStop() {

}