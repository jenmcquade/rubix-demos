import React from 'react';
import Perspective from '../menus/Perspective';
import Styles from '../styles/Menu.styles';

const Style = new Styles();
const Wrapper = Style.menu;

export default class Menu extends React.Component {
  render() {
    return( 
      <Wrapper role="navigation">
        <Perspective />
      </Wrapper>
     );
  }
};
