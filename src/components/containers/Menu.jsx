import React from 'react';
import Styles from '../menus/Menu.styles';
import Perspective from '../menus/Perspective';

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
