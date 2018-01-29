import React, { Component } from 'react';
import { connect } from 'react-redux';

//
// Import Styled Components and React Bootstrap Components
//
import Common, {
  Item,
  Icon,
  Title,
  Trigger,
  Content,
  CategoryLabel,
} from '../menus/Common';

class Category extends Component {
  /**
   * Constructor
   * 
   * 1. Merge new Common object with this
   * 2. Set the menu color theme
   * 3. Set state to Redux store
   * 4. Local properties and bindings
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    Object.assign(this, new Common(this));
    this.id = props.id.toLowerCase();
    this.setTheme(this.props, true);

    this.category = this.props.menu.categories[this.id];
    this.themeColor = this.category.backgroundColor; 
    this.triggerColor = this.category.triggerColor;

    this.state = {
      isDefaultState: true,
      app: props.app,
      menu: props.menu,
      iconType: props.iconType,
      themeColor: this.themeColor,
      triggerColor: this.triggerColor,
    }
  }

 
  //
  // Lifecycle handlers
  //
  componentDidUpdate() {
    if(this.props.id) {
      this.setTheme(this.props);
    }
  }

  //
  // Render to the Menu container
  //
  render() {
    if(!this.props.id) {
      return false;
    }
    let label = this.props.label;
    let baseColor = this.category.baseColor;
    let menuIsOpen = this.category.menuIsOpen; 
    let iconType = this.props.iconType;
    let inlineContentTransform = this.category.inlineContentTransform;

    return (
      <Item id={this.id} style={{backgroundColor: this.themeColor}}>
        <Trigger 
          default={this.state.isDefaultState}
          active={menuIsOpen}
          onClick={this.handleTrigger}
          style={{backgroundColor: this.themeColor, color: this.triggerColor}}
        >
          <Icon className={iconType} />
          <CategoryLabel>{label}</CategoryLabel>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={menuIsOpen} 
          backgroundColor={baseColor}
          style={{ 
            transform: inlineContentTransform,
          }}
        >
          <Title>{label}</Title> 
          { this.props.children }
        </Content>
      </Item>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    menu: store.menu,
  };
}

export default connect(mapStateToProps)(Category);