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
    this.state = props.object;
    this.state.isDefaultState = true;
    this.wrapperStyle = {
      transform: 'scale(' + this.props.object.wrapperScale[0] + ',' + this.props.object.wrapperScale[1] + ')',
    }
  }

  componentWillUpdate(props) {
    this.wrapperStyle = {
      transform: 'scale(' + props.object.wrapperScale[0] + ',' + props.object.wrapperScale[1] + ')',
    }
  }

  render() {
    return(
      <CubeWrapper style={this.wrapperStyle}>
        <Box flat={this.props.object.objectIsFlat}>
          <Face id="top" 
            itemBgColor="white" 
            itemColor="black" 
            style={this.props.object.style['top']}
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
          <Face id="front" 
            itemBgColor="blue" 
            style={this.props.object.style['front']}
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
          <Face id="bottom" 
            itemBgColor="yellow" 
            itemColor="black" 
            style={this.props.object.style['bottom']}
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
          <Face id="back" 
            itemBgColor="green" 
            style={this.props.object.style['back']}
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
          <Face id="right" 
            itemBgColor="orange" 
            style={this.props.object.style['right']}
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
          <Face id="left" 
            itemBgColor="red" 
            style={this.props.object.style['left']}
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
        </Box>
      </CubeWrapper>
    );
  }
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    object: store.rubix,
  };
}

export default connect(mapStateToProps)(Cube);

