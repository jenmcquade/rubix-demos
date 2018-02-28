import React from 'react';
import { connect } from 'react-redux';
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

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    }
    this.handleStart = handleStart.bind(this);
    this.handleDrag = handleDrag.bind(this);
    this.handleStop = handleStop.bind(this);
    this.handleProjectInfoClick = handleProjectInfoClick.bind(this);
  }

  render() {
    return(
      <div id="stage" className="stage" role="main">
        <Cube hasImagesOnLoad={this.props.app.qs.hasOwnProperty('offline') ? false : true} />
        <InfoWrap isOpen={ this.props.app.infoPanelIsOpen } ref="InfoWrapper" id="infoWrapper">
          <InfoLink to={ this.props.app.infoPanelIsOpen ? window.location.pathname + window.location.search : window.location.search + '#info' } onClick={this.handleProjectInfoClick}>
            <i className='fa fa-info-circle'/>
          </InfoLink>
          <div style={{borderBottom: '1px solid white', }} />
          { <ProxyInfo /> }
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

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
  };
}

export default connect(mapStateToProps)(Stage);