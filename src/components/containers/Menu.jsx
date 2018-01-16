import React from 'react';
import Perspective from '../menus/Perspective';
import Styles from '../styles/Menu.styles';

const Style = new Styles();
const Wrapper = Style.menu;

const Menu = () => (
  <Wrapper role="navigation">
    <Perspective />
  </Wrapper>
);

export default Menu;
