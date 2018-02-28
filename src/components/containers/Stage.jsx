import React from 'react';
import Cube from '../3d/rubix/Cube';
import CubeMenu from '../3d/rubix/CubeMenu'
import EnvInfo from '../EnvInfo';
import ProxyInfo from '../ProxyInfo';

import Styles from './container.styles';

// Create container styles
const styles = new Styles();
const InfoLink = styles.info;
const InfoWrap = styles.infoWrap;

const ProdBuildInfo = () => {
  let buildInfo = document.querySelector('#prodBuildInfo').innerHTML;
  return <div dangerouslySetInnerHTML={{ __html: buildInfo}}/>
}

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = handleStart.bind(this);
    this.handleDrag = handleDrag.bind(this);
    this.handleStop = handleStop.bind(this);
    this.handleProjectInfoClick = handleProjectInfoClick.bind(this);
  }

  render() {
    let infoPanelIsOpen = this.props.appStore.infoPanelIsOpen;
    let qs = this.props.appStore.qs;
    let igStatus = this.props.igStatus;
    let screenSize = this.props.screenSize;
    return(
      <div id="stage" className="stage" role="main">
        <Cube screenSize={screenSize} igStatus={igStatus} hasImagesOnLoad={qs.hasOwnProperty('offline') || !igStatus ? false : true} />
        <InfoWrap isOpen={ infoPanelIsOpen } ref="InfoWrapper" id="infoWrapper">
          <InfoLink 
            to={ infoPanelIsOpen ? 
              window.location.pathname + window.location.search : 
              window.location.search + '#info' } 
            onClick={this.handleProjectInfoClick}
          >
            <i className='fa fa-info-circle'/>
          </InfoLink>
          <div style={{borderBottom: '1px solid white', }} />
          { <ProxyInfo igStatus={igStatus} /> }
          { process.env.NODE_ENV !== 'production' && <EnvInfo/> }
          { <ProdBuildInfo /> }
        </InfoWrap>
        <CubeMenu/>
      </div>
    );
  }
}

function handleProjectInfoClick(e) {
  //this.props.dispatch(toggleInfoPanel());
}

function handleStart() {

}

function handleDrag() {

}

function handleStop() {

}
