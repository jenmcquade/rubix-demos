import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './Menu.styles';

// Import Actions
import {
  togglePerspective,
} from './MenuActions'

import {
  flattenObject,
  restoreObject,
  zoomIn,
  zoomOut
} from '../3d/rubix/CubeActions'

// Styled component creation
const Style = new Styles();
const Item = Style.item; // A complete navigation item
const Content = Style.content; // Content of the nav item menu
const Icon = Style.icon; // Icon for the nav item trigger
const Title = Style.title; // Title above nav item content
const Trigger = Style.trigger; // Nav item activation area
const Category = Style.category; // Nav item trigger label
const SubTitle = Style.h4;
const Sub = Style.ul; // Nav item content subcategory
const MenuAction = Style.li; // Nav item content button wrapper
const Button = Style.btnPrimary; // Nav item content buttons
const ButtonGroup = Style.btnGroup; // Bootstrap group of buttonsf
const Label = Style.label; // Button group label
const GroupButton = Style.btnSecondary; // Button in a group

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggers: props.triggers,
      rubix: props.rubix
    }
    this.state.isDefaultState = true;
    this.handleClick = this.handleClick.bind(this);
    this.flatten = this.flatten.bind(this);
    this.restore = this.restore.bind(this);
    this.scaleWrapperIn = this.scaleWrapperIn.bind(this);
    this.scaleWrapperOut = this.scaleWrapperOut.bind(this);
  }
 
  handleClick() {
    if(this.state.isDefaultState) {
      this.setState( {'isDefaultState': false });
    }
    this.props.dispatch(togglePerspective());
  }

  flatten() {
    this.props.dispatch(flattenObject());
  }

  restore() {
    this.props.dispatch(restoreObject());
  }

  scaleWrapperOut() {
    this.props.dispatch(zoomOut());
  }

  scaleWrapperIn() {
    this.props.dispatch(zoomIn());
  }

  render() {
    return (
      <Item>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.props.triggers.menuIsOpen}
          onClick={this.handleClick}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>Perspective</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.props.triggers.menuIsOpen} 
          style={{ transform: this.state.inlineContentTransform }}
        >
          <Title>Perspective</Title>
          <SubTitle>
            Transform
          </SubTitle>
          <Sub>
            <MenuAction><Button onClick={this.flatten}>Flatten</Button></MenuAction>
            <MenuAction><Button onClick={this.restore}>Build</Button></MenuAction>
            <MenuAction>
              <Label>Zoom</Label>
              <ButtonGroup role="group" aria-label="zoom">
                <GroupButton onClick={this.scaleWrapperOut} type="button">-</GroupButton>
                <GroupButton onClick={this.scaleWrapperIn} type="button">+</GroupButton>
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
    triggers: store.menu,
    rubix: store.rubix
  };
}

export default connect(mapStateToProps)(Perspective);