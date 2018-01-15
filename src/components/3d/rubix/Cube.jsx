import React from 'react';
import Styles from './Cube.styles';

const Style = new Styles();

/**
 * Styled Wrappers
 */
const CubeWrapper = Style.wrapper;
const Box = Style.cube;
const Item = Style.item;
const Face = Style.face;

const Cube = () => (
  <CubeWrapper>
    <Box>
      <Face id="top">
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
      <Face id="front">
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
      <Face id="bottom">
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
      <Face id="back">
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
      <Face id="right">
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
      <Face id="left">
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

export default Cube;
