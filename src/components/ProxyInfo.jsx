import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  SubTitle, Status,
} from './menus/Common'; 

class ProxyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      igProxyIsOnline: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({igProxyIsOnline: nextProps.ig.status})
  }
  render() {
    let proxyIsOnline = this.state.igProxyIsOnline;
    return(
      <div>
        <SubTitle>Web Services</SubTitle>
        <label>Instagram API Status:</label>
        <Status className={proxyIsOnline.toString()}>
          {proxyIsOnline ? 'Online' : 'Offline'}
        </Status>
      </div>
    );
  }
}

ProxyInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(ProxyInfo);

