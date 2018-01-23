import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from '../styles/Menu.styles';

// Import Actions
import { toggleMenu } from './MenuActions';

const Style = new Styles();
const Item = Style.item;
const Content = Style.content;
const Icon = Style.icon;
const Title = Style.title;
const Trigger = Style.trigger;
const Category = Style.category;

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = props.triggers;
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props);
  }

  handleClick() {
    this.props.dispatch(toggleMenu());
    return true;
  }

  render() {
    return (
      <Item className={this.state.toggleClass}>
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