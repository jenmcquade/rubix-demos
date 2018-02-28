import React from 'react';
import { connect } from 'react-redux';
import Styles from './Cube.styles';

const Style = new Styles();

/**
 * Styled Wrappers
 */
const CubeMenuWrapper = Style.wrapper;

class CubeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return(
      <CubeMenuWrapper>

      </CubeMenuWrapper>
    );
  }
};


// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    object: store.rubix,
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(CubeMenu);

