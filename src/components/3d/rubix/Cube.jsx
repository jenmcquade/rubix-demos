import React from 'react';
import { connect } from 'react-redux';
import Styles from './Cube.styles';

const Style = new Styles();

/**
 * Styled Wrappers
 */
const CubeWrapper = Style.wrapper;
const Box = Style.cube;
const Item = Style.item;
const Face = Style.face;

class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.faces = Object.keys(this.props.object.style);
  }

  componentDidMount(props) {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      wrapperStyle: {
        transform: 'scale(' + nextProps.object.scale[nextProps.app.screenSize][0] + ',' + nextProps.object.scale[nextProps.app.screenSize][1] + ')',
      }
    });
  }

  render() {
    return(
      <CubeWrapper style={this.state.wrapperStyle}>
        <Box flat={this.props.object.objectIsFlat}>
          { 
            this.faces.map((face) => {
              return <Face id={face} key={face}
                  itemBgColor={this.state.object.theme[face].bgColor}
                  itemColor={this.state.object.theme[face].txtColor}
                  style={this.props.object.style[face]}
                >
                <Item position="top-left" type="corner">top left</Item>
                <Item position="top" type="side">top</Item>
                <Item position="top-right" type="corner">top right</Item>
                <Item position="left" type="side">left</Item>
                <Item position="center" type="middle">center</Item>
                <Item position="right" type="side">right</Item>
                <Item position="bottom-left" type="corner">bot left</Item>
                <Item position="bottom" type="side">bottom</Item>
                <Item position="bottom-right" type="corner">bot right</Item>
              </Face>
            })
          }
        </Box>
      </CubeWrapper>
    );
  }
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    object: store.rubix,
  };
}

export default connect(mapStateToProps)(Cube);

