import React from 'react';
import { connect } from 'react-redux';
import 'html-gl/dist/htmlgl.min';

import { MenuWrapper } from '../menus/Common'
import Category from '../menus/Category';
import Perspective from '../menus/Perspective';
import Theme from '../menus/Theme';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.menu;
  }
  componentDidMount() {
    document.querySelector('#perspective a').focus();  
  }
  render() {
    return( 
      <MenuWrapper id="MenuWrapper" role="navigation">
        <Category tabindex="0" label="Perspective" id="perspective" iconType="glyphicon glyphicon-th">
          <Perspective />
        </Category>
        <Category tabindex="0" label="Theme" id="theme" iconType="fa fa-hashtag">
          <Theme />
        </Category>
      </MenuWrapper>
     );
  }
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    menu: store.menu,
  };
}

export default connect(mapStateToProps)(Menu);