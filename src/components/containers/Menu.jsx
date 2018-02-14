import React from 'react';
import { connect } from 'react-redux';
import 'html-gl/dist/htmlgl.min';

import { MenuWrapper } from '../menus/Common'
import Category from './Category';
import Perspective from '../menus/Perspective';
import Theme from '../menus/Theme';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.menu;
  }
  render() {
    return( 
      <MenuWrapper role="navigation">
        <Category label="Perspective" id="perspective" iconType="glyphicon glyphicon-th">
          <html-gl>
            <Perspective />
          </html-gl>
        </Category>
        <Category label="Theme" id="theme" iconType="fa fa-hashtag">
          <html-gl>
            <Theme />
          </html-gl>
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