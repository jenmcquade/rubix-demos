import React, { Component } from 'react';
import { connect } from 'react-redux';

//
// Import Styled Components and React Bootstrap Components
//
import Common, {
  Item,
  Content,
  Icon,
  Title,
  Trigger,
  Category,
  SubTitle,
  Sub,
  MenuAction,
  Button, 
  ButtonGroup,
  Label, 
  GroupButton,
} from './Common';

//
// Import Actions
//
import {
  flattenObject,
  restoreObject,
  zoomIn,
  zoomOut
} from '../3d/rubix/CubeActions'

//
// CONSTANTS
//
const MENU_ID = 'Perspective';
const THEME_COLOR = [255,0,0,1];

//
// COMPONENT 
//
class Perspective extends Component {
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
    this.id = MENU_ID.toLowerCase();
    Object.assign(this, new Common(this));
    this.setTheme(this.props, true);

    let baseColor = props.triggers.menus[this.id].backgroundColor;
    let triggerColor = props.triggers.menus[this.id].triggerColor;
    this.state = {
      isDefaultState: true,
      app: props.app,
      triggers: props.triggers,
      rubix: props.rubix,
      themeColor: baseColor,
      triggerColor: triggerColor,
    }

    // Shorthand referrers
    this.themeColor = this.state.themeColor; // string
    this.triggerColor = this.state.triggerColor; // string

    // Binders
    this.flatten = this.flatten.bind(this);
    this.restore = this.restore.bind(this);
    this.scaleIn = this.scaleIn.bind(this);
    this.scaleOut = this.scaleOut.bind(this);
  }

  //
  // Object/Stage handlers
  //
  flatten() {
    this.props.dispatch(flattenObject());
  }

  restore() {
    this.props.dispatch(restoreObject());
  }

  scaleOut() {
    this.props.dispatch(zoomOut());
  }

  scaleIn() {
    this.props.dispatch(zoomIn());
  }

  //
  // Lifecycle handlers
  //
  componentDidUpdate() {
    this.setTheme(this.props);
  }

  //
  // Render to the Menu container
  //
  render() {
    return (
      <Item id={this.id} style={{backgroundColor: this.themeColor}}>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen}
          onClick={this.handleTrigger}
          style={{backgroundColor: this.themeColor, color: this.triggerColor}}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>{MENU_ID}</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen} 
          backgroundColor={this.props.triggers.menus[this.id].baseColor}
          style={{ 
            transform: this.state.triggers.menus[this.id].inlineContentTransform,
          }}
        >
          <Title>{MENU_ID}</Title>
          <SubTitle>
            Transform
          </SubTitle>
          <Sub>
            <MenuAction><Button onClick={this.flatten}>Flatten</Button></MenuAction>
            <MenuAction><Button onClick={this.restore}>Build</Button></MenuAction>
            <MenuAction>
              <Label>Zoom</Label>
              <ButtonGroup role="group" aria-label="zoom">
                <GroupButton onClick={this.scaleOut} type="button">-</GroupButton>
                <GroupButton onClick={this.scaleIn} type="button">+</GroupButton>
              </ButtonGroup>
            </MenuAction>
          </Sub>
        </Content>
      </Item>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    triggers: store.menu,
    rubix: store.rubix
  };
}

export default connect(mapStateToProps)(Perspective);