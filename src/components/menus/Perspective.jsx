import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './Menu.styles';

// Import Actions
import { toggleMenu } from './MenuActions';

const Style = new Styles();
const Item = Style.item; // A complete navigation item
const Content = Style.content; // Content of the nav item menu
const Icon = Style.icon; // Icon for the nav item trigger
const Title = Style.title; // Title above nav item content
const Trigger = Style.trigger; // Nav item activation area
const Category = Style.category; // Nav item trigger label

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = props.triggers;
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick() {
    this.props.dispatch(toggleMenu('perspective'));
  }

  render() {
    return (
      <Item>
        <Trigger 
          active={this.props.triggers.menuIsOpen}
          onClick={this.handleClick}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>Perspective</Category>
        </Trigger>
        <Content
          active={this.props.triggers.menuIsOpen} 
          style={{ transform: this.state.inlineContentTransform }}
        >
          <Title>Perspective</Title>
          <ul>
            <li>Nav item 1</li>
            <li>Nav item 2</li>
          </ul>
        </Content>
      </Item>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    triggers: store.menu,
  };
}

export default connect(mapStateToProps)(Perspective);